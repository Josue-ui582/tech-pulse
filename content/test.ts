import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from './src/generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg(process.env.DATABASE_URL!)
});

async function main() {
  const news = await prisma.news.findMany();
  console.log(news);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());