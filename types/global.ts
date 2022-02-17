import type { PrismaClient } from '@prisma/client';

export interface ContextInterface {
  prisma: PrismaClient;
}
