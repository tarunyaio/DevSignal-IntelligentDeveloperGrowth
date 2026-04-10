import { FastifyInstance } from 'fastify';
import { supabaseAdmin } from '../server';

export async function analyticsRoutes(fastify: FastifyInstance) {

  // GET /api/analytics — aggregated stats for user
  fastify.get('/analytics', async (request) => {
    const { data: repos, error } = await supabaseAdmin
      .from('repositories')
      .select('stars, forks, language, open_issues, updated_at')
      .eq('owner_id', request.userId);

    if (error || !repos) {
      return { total_repos: 0, total_stars: 0, total_forks: 0, total_issues: 0, languages: {}, recent_activity: [] };
    }

    const total_repos = repos.length;
    const total_stars = repos.reduce((s, r) => s + (r.stars || 0), 0);
    const total_forks = repos.reduce((s, r) => s + (r.forks || 0), 0);
    const total_issues = repos.reduce((s, r) => s + (r.open_issues || 0), 0);

    const languages: Record<string, number> = {};
    for (const r of repos) {
      if (r.language) languages[r.language] = (languages[r.language] || 0) + 1;
    }

    // Language percentages
    const totalLangCount = Object.values(languages).reduce((a, b) => a + b, 0);
    const languagePercentages = Object.entries(languages)
      .map(([name, count]) => ({ name, percentage: Math.round((count / totalLangCount) * 100) }))
      .sort((a, b) => b.percentage - a.percentage);

    return {
      total_repos,
      total_stars,
      total_forks,
      total_issues,
      languages: languagePercentages,
      last_updated: new Date().toISOString(),
    };
  });

  // GET /api/sync-history — recent sync events
  fastify.get('/sync-history', async (request) => {
    const { data, error } = await supabaseAdmin
      .from('sync_history')
      .select('*')
      .eq('user_id', request.userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) return { history: [] };
    return { history: data };
  });
}
