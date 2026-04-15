import { FastifyInstance } from 'fastify';
import { Octokit } from 'octokit';
import { env } from '../env';
import { supabaseAdmin } from '../server';

export async function activityRoutes(fastify: FastifyInstance) {
  
  fastify.get('/activity', async (request, reply) => {
    const token = env.GITHUB_TOKEN;
    if (!token) {
      return reply.status(500).send({ error: 'Server GitHub token not configured' });
    }

    const octokit = new Octokit({ auth: token });

    try {
      // 1. Find the GitHub username for this userId
      // We check the repositories table for the first repo owned by this user
      const { data: repos, error: repoError } = await supabaseAdmin
        .from('repositories')
        .select('name')
        .eq('owner_id', request.userId)
        .limit(1);

      if (repoError || !repos || repos.length === 0) {
        // Fallback or empty state if no repos synced yet
        return { activities: [] };
      }

      // name is in 'owner/repo' format
      const githubUsername = repos[0].name.split('/')[0];

      // 2. Fetch Public Events from GitHub
      const { data: events } = await octokit.rest.activity.listPublicEventsForUser({
        username: githubUsername,
        per_page: 20
      });

      // 3. Map to ActivityItem format
      const activities = events
        .map(event => {
          let type: 'commit' | 'pr' | 'merge' | 'issue' | 'other' = 'other';
          let title = '';
          let description = '';

          switch (event.type) {
            case 'PushEvent':
              type = 'commit';
              const commit = (event.payload as any).commits?.[0];
              title = commit?.message || 'Pushed commits';
              description = `Pushed to ${event.repo.name}`;
              break;
            case 'PullRequestEvent':
              const pr = (event.payload as any).pull_request;
              type = (event.payload as any).action === 'closed' && pr.merged ? 'merge' : 'pr';
              title = pr?.title || 'PR Activity';
              description = `${(event.payload as any).action} PR in ${event.repo.name}`;
              break;
            case 'IssuesEvent':
              type = 'issue';
              title = (event.payload as any).issue?.title || 'Issue Activity';
              description = `${(event.payload as any).action} issue in ${event.repo.name}`;
              break;
            default:
              return null; // Skip non-essential events
          }

          return {
            id: event.id,
            type,
            title,
            repo: event.repo.name.split('/')[1] || event.repo.name,
            time: formatTimeAgo(new Date(event.created_at || '')),
            description
          };
        })
        .filter(Boolean)
        .slice(0, 10);

      return { activities };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      fastify.log.error(err, 'Activity fetch error');
      return reply.status(500).send({ error: message });
    }
  });
}

function formatTimeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
}
