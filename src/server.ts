import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectRedis } from './config/redis';

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`🚀 Logistics CRM Backend running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
