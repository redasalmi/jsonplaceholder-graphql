import 'reflect-metadata';
import path from 'path';
import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import fastifyCompress from 'fastify-compress';
import fastifyHelmet from 'fastify-helmet';
import fastifyStatic from 'fastify-static';
import mercurius from 'mercurius';
import { getDistDirectory } from 'altair-static';

import buildSchema from '~/graphql/buildSchema';
import altairRoute from '~/routes/altair';

const main = async () => {
  const app = fastify({ logger: true });
  const prisma = new PrismaClient();
  const port = process.env.PORT || 5000;

  try {
    // middlewares
    app.register(fastifyCompress);
    app.register(fastifyHelmet, {
      contentSecurityPolicy: false,
    });

    // public folder
    app.register(fastifyStatic, {
      root: path.join(__dirname, 'public'),
    });
    app.register(fastifyStatic, {
      root: getDistDirectory(),
      prefix: '/altair/',
      decorateReply: false,
    });

    // graphql
    const schema = await buildSchema();
    app.register(mercurius, {
      schema,
      graphiql: false,
      ide: false,
      path: '/graphql',
      context: () => {
        return { prisma };
      },
    });

    // altair route
    app.register(altairRoute);

    // server
    await app.listen(port);
    console.log('server is running 🚀');
  } catch (err) {
    app.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
