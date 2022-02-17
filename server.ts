import 'reflect-metadata';
import path from 'path';
import fastify from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyHelmet from 'fastify-helmet';
import fastifyStatic from 'fastify-static';
import mercurius from 'mercurius';
import { buildSchema } from 'type-graphql';

import { UserResolver } from '~/graphql-ts/resolvers';

const main = async () => {
  const app = fastify({ logger: true });
  const port = process.env.PORT || 5000;

  try {
    // middlewares
    app.register(fastifyCompress);
    app.register(fastifyHelmet, {
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    });

    // public folder
    app.register(fastifyStatic, {
      root: path.join(__dirname, 'public'),
    });

    // graphql
    const schema = await buildSchema({
      resolvers: [UserResolver],
    });
    app.register(mercurius, {
      schema,
      graphiql: true,
    });

    // server
    await app.listen(port);
    console.log(`server is running on port ${app.server.address()}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

main();
