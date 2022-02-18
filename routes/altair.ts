import renderAltair from 'altair-static';
import type { FastifyInstance } from 'fastify';

export default async function altairRoute(app: FastifyInstance) {
  const initialQuery = `
query {
  users {
    id
    name
    username
    email
    address {
      city
    }
  }
}`;

  const altairPage = renderAltair({
    baseURL: '/altair/',
    endpointURL: '/graphql',
    initialQuery,
    initialSettings: {
      'theme.fontsize': 30,
    },
  });

  app.get('/altair', (_, reply) => {
    reply.type('text/html').send(altairPage);
  });
}
