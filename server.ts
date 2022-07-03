import path from 'path';
import process from 'process';
import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import fastifyCompress from '@fastify/compress';
import fastifyHelmet from '@fastify/helmet';
import fastifyStatic from '@fastify/static';
import { getDistDirectory } from 'altair-static';
import mercurius from 'mercurius';
import { codegenMercurius } from 'mercurius-codegen';

import altairRoute from '~/routes/altair';

import schema from '~/graphql/buildSchema';
import resolvers from '~/graphql/resolvers';

declare module 'mercurius' {
  interface MercuriusContext {
    prisma: PrismaClient;
  }
}

const startServer = async () => {
  const app = fastify({ logger: true });
  const prisma = new PrismaClient();
  const port = parseInt(process.env.PORT || '5000', 10);

  try {
    // middlewares
    app.register(fastifyCompress);
    app.register(fastifyHelmet, {
      contentSecurityPolicy: false,
    });

    // public folder
    app.register(fastifyStatic, {
      root: path.join(process.cwd(), 'public'),
    });
    app.register(fastifyStatic, {
      root: getDistDirectory(),
      prefix: '/altair/',
      decorateReply: false,
    });

    // graphql
    app.register(mercurius, {
      schema,
      resolvers,
      graphiql: false,
      ide: false,
      path: '/graphql',
      context: () => {
        return { prisma };
      },
    });

    codegenMercurius(app, {
      targetPath: './graphql/generated.ts',
    }).catch(console.error);

    // altair route
    app.register(altairRoute);

    // server
    await app.listen({ port });
    console.log('server is running 🚀');
  } catch (err) {
    app.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
