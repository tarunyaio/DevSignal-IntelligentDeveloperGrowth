import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { supabaseAdmin } from '../server';

const createSnippetSchema = z.object({
  title: z.string().min(1).max(200),
  code: z.string().min(1),
  language: z.string().min(1),
});

const updateSnippetSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  code: z.string().min(1).optional(),
  language: z.string().min(1).optional(),
});

export async function snippetRoutes(fastify: FastifyInstance) {

  // GET /api/snippets — list user's saved snippets
  fastify.get('/snippets', async (request) => {
    const { data, error } = await supabaseAdmin
      .from('snippets')
      .select('*')
      .eq('user_id', request.userId)
      .order('updated_at', { ascending: false });

    if (error) return { snippets: [] };
    return { snippets: data };
  });

  // POST /api/snippets — save a new snippet
  fastify.post('/snippets', async (request, reply) => {
    const parsed = createSnippetSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten().fieldErrors });
    }

    const { data, error } = await supabaseAdmin
      .from('snippets')
      .insert({ ...parsed.data, user_id: request.userId })
      .select()
      .single();

    if (error) {
      return reply.status(500).send({ error: error.message });
    }

    return reply.status(201).send({ snippet: data });
  });

  // PATCH /api/snippets/:id — update a snippet
  fastify.patch<{ Params: { id: string } }>('/snippets/:id', async (request, reply) => {
    const parsed = updateSnippetSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten().fieldErrors });
    }

    const { data, error } = await supabaseAdmin
      .from('snippets')
      .update({ ...parsed.data, updated_at: new Date().toISOString() })
      .eq('id', request.params.id)
      .eq('user_id', request.userId)
      .select()
      .single();

    if (error || !data) {
      return reply.status(404).send({ error: 'Snippet not found' });
    }

    return { snippet: data };
  });

  // DELETE /api/snippets/:id — delete a snippet
  fastify.delete<{ Params: { id: string } }>('/snippets/:id', async (request, reply) => {
    const { error } = await supabaseAdmin
      .from('snippets')
      .delete()
      .eq('id', request.params.id)
      .eq('user_id', request.userId);

    if (error) {
      return reply.status(500).send({ error: error.message });
    }

    return reply.status(204).send();
  });
}
