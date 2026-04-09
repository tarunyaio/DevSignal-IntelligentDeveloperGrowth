import { FastifyInstance } from 'fastify';
import { supabaseAdmin } from '../server';

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

  // GET /api/repos/:id — single repo detail
  fastify.get<{ Params: { id: string } }>('/repos/:id', async (request, reply) => {
    const { data, error } = await supabaseAdmin
      .from('repositories')
      .select('*')
      .eq('id', request.params.id)
      .eq('owner_id', request.userId)
      .single();

    if (error || !data) {
      return reply.status(404).send({ error: 'Repository not found' });
    }

    return { repo: data };
  });
}
