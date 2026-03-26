import * as dotenv from "dotenv"
import { PrismaClient } from "../generated/client"
import { withAccelerate } from "@prisma/extension-accelerate"

dotenv.config();

const globalForPrisma = globalThis as unknown as { prisma: any }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  } as any).$extends(withAccelerate())

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma