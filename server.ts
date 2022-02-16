import path from 'path';
import Fastify from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyHelmet from 'fastify-helmet';
import fastifyStatic from 'fastify-static';
import mercurius from 'mercurius';

const fastify = Fastify({ logger: true });
const port = process.env.PORT || 5000;

// middlewares
fastify.register(fastifyCompress);
fastify.register(fastifyHelmet, {
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
});

// public folder
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
});

// graphql
const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`;

const resolvers = {
  Query: {
    add: async (_: string, { x, y }: { x: number; y: number }) => x + y,
  },
};

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

// server
fastify.listen(port, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`server is running on port ${address}`);
});
