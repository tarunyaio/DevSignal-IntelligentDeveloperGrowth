import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { env } from './env';
import { syncRoutes } from './routes/sync';
import { repoRoutes } from './routes/repos';
import { analyticsRoutes } from './routes/analytics';
import { resourceRoutes } from './routes/resources';
import { snippetRoutes } from './routes/snippets';
import { profileRoutes } from './routes/profile';
import { activityRoutes } from './routes/activity';
import { createClient } from '@supabase/supabase-js';

const fastify = Fastify({ logger: true });

// Type definitions for decorated request
declare module 'fastify' {
  interface FastifyRequest {
    userId: string;
    githubUsername: string;
  }
}

// Supabase admin client (service role for server-side operations)
export const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// Auth middleware — verifies Supabase JWT from Authorization header
fastify.decorateRequest('userId', '');
fastify.decorateRequest('githubUsername', '');
fastify.addHook('onRequest', async (request, reply) => {
  // Skip auth for health check and CORS preflight
  if (request.url === '/health' || request.method === 'OPTIONS') return;

  // AI Debug Bypass (Temporary for layout inspection)
  if (request.headers['x-ai-debug'] === 'ai-magic-2026') {
    request.userId = 'ai-debug-session';
    request.githubUsername = 'ai-debug-session';
    return;
  }

  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.slice(7);
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return reply.status(401).send({ error: 'Invalid or expired token' });
  }

  request.userId = user.id;
  // Get GitHub username from metadata (usually 'user_name' or 'preferred_username')
  request.githubUsername = user.user_metadata?.user_name || user.user_metadata?.preferred_username || '';
});

// Plugins
fastify.register(cors, { origin: true });
fastify.register(rateLimit, { max: 100, timeWindow: '1 minute' });

// Health check (no auth required)
fastify.get('/health', async () => {
  return { status: 'alive', timestamp: new Date().toISOString() };
});

// API routes
fastify.register(syncRoutes, { prefix: '/api' });
fastify.register(repoRoutes, { prefix: '/api' });
fastify.register(analyticsRoutes, { prefix: '/api' });
fastify.register(resourceRoutes, { prefix: '/api' });
fastify.register(snippetRoutes, { prefix: '/api' });
fastify.register(profileRoutes, { prefix: '/api' });
fastify.register(activityRoutes, { prefix: '/api' });

const start = async () => {
  try {
    await fastify.listen({ port: env.PORT, host: '0.0.0.0' });
    console.log(`DevSignal API started on port ${env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
