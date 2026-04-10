import { FastifyInstance } from 'fastify';
import { Octokit } from 'octokit';
import { z } from 'zod';
import { supabaseAdmin } from '../server';
import { env } from '../env';

const syncBodySchema = z.object({
  github_username: z.string().min(1).optional(),
  org_name: z.string().min(1).optional(),
}).refine(d => d.github_username || d.org_name, {
  message: 'Either github_username or org_name is required',
});

export async function syncRoutes(fastify: FastifyInstance) {

  fastify.post('/sync', async (request, reply) => {
    const parsed = syncBodySchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten().fieldErrors });
    }

    const { github_username, org_name } = parsed.data;
    const token = env.GITHUB_TOKEN;
    if (!token) {
      return reply.status(500).send({ error: 'Server GitHub token not configured' });
    }

    const octokit = new Octokit({ auth: token });

    try {
      let repos;
      if (org_name) {
        const { data } = await octokit.rest.repos.listForOrg({ org: org_name, per_page: 100, type: 'all' });
        repos = data;
      } else {
        const { data } = await octokit.rest.repos.listForUser({ username: github_username!, per_page: 100, sort: 'updated' });
        repos = data;
      }

      const rows = repos.map(repo => ({
        github_id: repo.id,
        owner_id: request.userId,
        name: repo.full_name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
        open_issues: repo.open_issues_count,
        default_branch: repo.default_branch,
        updated_at: repo.updated_at,
        last_sync: new Date().toISOString(),
      }));

      const { error } = await supabaseAdmin
        .from('repositories')
        .upsert(rows, { onConflict: 'github_id' });

      if (error) {
        fastify.log.error(error, 'Batch upsert failed');
        return reply.status(500).send({ error: 'Database sync failed' });
      }

      return { success: true, synced: rows.length, timestamp: new Date().toISOString() };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      fastify.log.error(err, 'Sync error');
      return reply.status(500).send({ error: message });
    }
  });

  fastify.get('/metrics', async (request) => {
    const { data, error } = await supabaseAdmin
      .from('repositories')
      .select('stars, forks, language, open_issues')
      .eq('owner_id', request.userId);

    if (error) {
      return { total_repos: 0, total_stars: 0, total_forks: 0, languages: {} };
    }

    const total_repos = data.length;
    const total_stars = data.reduce((s, r) => s + (r.stars || 0), 0);
    const total_forks = data.reduce((s, r) => s + (r.forks || 0), 0);
    const total_issues = data.reduce((s, r) => s + (r.open_issues || 0), 0);
    const languages: Record<string, number> = {};
    for (const r of data) {
      if (r.language) languages[r.language] = (languages[r.language] || 0) + 1;
    }

    return { total_repos, total_stars, total_forks, total_issues, languages, last_updated: new Date().toISOString() };
  });
}
