import { FastifyInstance } from 'fastify';
import { supabaseAdmin } from '../server';

export async function resourceRoutes(fastify: FastifyInstance) {

  // GET /api/resources — list all curated resources
  fastify.get('/resources', async (_request, reply) => {
    const { data, error } = await supabaseAdmin
      .from('resources')
      .select('*')
      .order('rating', { ascending: false });

    if (error) {
      return reply.status(500).send({ error: error.message });
    }

    return { resources: data };
  });
}
