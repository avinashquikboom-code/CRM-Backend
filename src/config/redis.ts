import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
export const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.warn('Redis connection failed, continuing without cache:', error);
  }
};
