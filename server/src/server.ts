import Fastify from 'fastify';
import cors from '@fastify/cors';
import * as dotenv from 'dotenv';
import { syncRoutes } from './routes/sync';

// Load environment variables (api keys aur config)
dotenv.config();

const fastify = Fastify({
  logger: true // Server activity track karne ke liye
});

// Register plugins
fastify.register(cors, {
  origin: true // Frontend se connectivity allow karein
});

// Hello world route for health check
fastify.get('/health', async () => {
  return { status: 'alive', message: 'DevSignal API is running smoothly!' };
});

// Synchronizer routes register karein
fastify.register(syncRoutes, { prefix: '/api' });

// Yeh function server ko start karega
const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 DevSignal Engine started on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
