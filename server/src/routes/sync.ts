import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Octokit } from 'octokit';
import { createClient } from '@supabase/supabase-js';

interface SyncRequestBody {
  github_token: string;
  org_name: string;
}

// Yeh function sync routes register karta hai
export async function syncRoutes(fastify: FastifyInstance) {
  
  fastify.post('/sync', async (request: FastifyRequest<{ Body: SyncRequestBody }>, reply: FastifyReply) => {
    const { github_token, org_name } = request.body;

    if (!github_token) {
      return reply.status(400).send({ error: 'GitHub Token missing hai!' });
    }

    // Octokit aur Supabase clients initialize karein
    const octokit = new Octokit({ auth: github_token });
    const supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_ANON_KEY || ''
    );

    try {
      fastify.log.info(`Sync shuru ho raha hai for: ${org_name}`);

      // 1. Fetch Repositories from GitHub
      // Yeh logic repositories extract karegi
      const { data: repos } = await octokit.rest.repos.listForOrg({
        org: org_name,
        per_page: 100
      });

      // 2. Process and Upsert to Supabase
      // Yeh loop har repo ko database mein sync karega
      for (const repo of repos) {
        const { error } = await supabase
          .from('repositories')
          .upsert({
            github_id: repo.id,
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            url: repo.html_url,
            last_sync: new Date().toISOString()
          }, { onConflict: 'github_id' });

        if (error) fastify.log.error(error, `Repo sync fail: ${repo.name}`);
      }

      return { 
        success: true, 
        message: `${repos.length} repositories sync ho gayi hain!`,
        timestamp: new Date().toISOString()
      };

    } catch (err: any) {
      fastify.log.error('Global Sync Error:', err);
      return reply.status(500).send({ 
        success: false, 
        message: 'Sync fail ho gaya. Kripya logs check karein.',
        error: err.message 
      });
    }
  });

  // Analytics/Metrics endpoint
  fastify.get('/metrics', async () => {
    // Yeh placeholder hai for aggregated intelligence
    return {
      total_commits: 1284,
      active_contributors: 42,
      average_health_score: 92,
      last_updated: new Date().toISOString()
    };
  });
}

