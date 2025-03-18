import { PrismaClient } from "@prisma/client";
import { env } from "../config/env";

if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the .env file")
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL
    }
  }
});

export default prisma;
