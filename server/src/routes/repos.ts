import { FastifyInstance } from 'fastify';
import { supabaseAdmin } from '../server';
import { Octokit } from 'octokit';
import { env } from '../env';
import { getCache, setCache } from '../utils/cache';

export async function repoRoutes(fastify: FastifyInstance) {

  // GET /api/repos — list user's synced repositories
  fastify.get('/repos', async (request) => {
    const { data, error } = await supabaseAdmin
      .from('repositories')
      .select('*')
      .eq('owner_id', request.userId)
      .order('stars', { ascending: false });

    if (error) {
      return { repos: [], error: error.message };
    }

    return { repos: data };
  });

  // GET /api/repos/:id — single repo detail with extended analytics
  fastify.get<{ Params: { id: string }; Querystring: { refresh?: string } }>('/repos/:id', async (request, reply) => {
    const { data: repo, error } = await supabaseAdmin
      .from('repositories')
      .select('*')
      .eq('id', request.params.id)
      .eq('owner_id', request.userId)
      .single();

    if (error || !repo) {
      request.log.error({ err: error, repoId: request.params.id }, 'Failed to fetch repository from DB');
      return reply.status(404).send({ error: 'Repository not found' });
    }

    const refreshRequested = request.query.refresh === 'true';
    const cacheKey = `repo_details_${repo.github_id}`;
    
    // Check cache unless refresh is requested
    if (!refreshRequested) {
      const cachedDetails = getCache<any>(cacheKey);
      if (cachedDetails) {
        request.log.info({ repoId: repo.github_id }, 'Serving repo details from cache');
        return { repo: { ...repo, ...cachedDetails } };
      }
    } else {
      request.log.info({ repoId: repo.github_id }, 'Force refresh requested, bypassing cache');
    }

    // Parallel fetching from GitHub with detailed logging
    const octokit = new Octokit({ auth: env.GITHUB_TOKEN });
    
    // Safety check for name parsing
    const nameParts = repo.name.split('/');
    const owner = nameParts.length >= 2 ? nameParts[0] : '';
    const name = nameParts.length >= 2 ? nameParts[1] : nameParts[0];

    request.log.info({ owner, name, github_token_exists: !!env.GITHUB_TOKEN }, 'Starting GitHub API fetch');

    if (!owner || !name) {
      request.log.error({ fullName: repo.name }, 'Invalid repository full_name format');
      return { repo: { ...repo, languages: {}, contributors: [], activity: [], readme: '' } };
    }

    try {
      const safeFetch = async <T,>(promise: Promise<T>, label: string, fallback: T): Promise<T> => {
        try {
          const result = await promise;
          request.log.info({ label }, `Successfully fetched ${label}`);
          return result;
        } catch (err: any) {
          request.log.warn({ err: err.message, status: err.status, label }, `Failed to fetch ${label}`);
          return fallback;
        }
      };

      const [languages, contributors, activity, readme] = await Promise.all([
        safeFetch(
          octokit.rest.repos.listLanguages({ owner, repo: name }).then(r => r.data),
          'languages',
          {}
        ),
        safeFetch(
          octokit.rest.repos.listContributors({ owner, repo: name, per_page: 20 }).then(r => r.data.map(c => ({
            login: c.login,
            avatar_url: c.avatar_url,
            contributions: c.contributions,
            html_url: c.html_url
          }))),
          'contributors',
          []
        ),
        safeFetch(
          octokit.rest.repos.getCommitActivityStats({ owner, repo: name }).then(r => r.data),
          'activity',
          []
        ),
        safeFetch(
          octokit.rest.repos.getReadme({ owner, repo: name }).then(r => Buffer.from(r.data.content, 'base64').toString()),
          'readme',
          ''
        )
      ]);

      const extendedDetails = {
        languages: languages || {},
        contributors: contributors || [],
        activity: Array.isArray(activity) ? activity.slice(-12) : [],
        readme: readme || ''
      };

      // Cache the result
      setCache(cacheKey, extendedDetails);

      return { repo: { ...repo, ...extendedDetails } };
    } catch (err) {
      request.log.error({ err }, 'Unexpected crash in parallel fetching logic');
      return { repo: { ...repo, languages: {}, contributors: [], activity: [], readme: '' } };
    }
  });
}
