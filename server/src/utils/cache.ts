import NodeCache from 'node-cache';

// Cache for 1 hour (3600 seconds), check for expired keys every 10 minutes
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

export const getCache = <T>(key: string): T | undefined => {
  return cache.get<T>(key);
};

export const setCache = <T>(key: string, value: T, ttl?: number): void => {
  if (ttl) {
    cache.set(key, value, ttl);
  } else {
    cache.set(key, value);
  }
};

export const deleteCache = (key: string): void => {
  cache.del(key);
};

export const clearCache = (): void => {
  cache.flushAll();
};

export default cache;
