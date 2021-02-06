const { graphqlHTTP } = require('express-graphql');
const expressPlayground = require('graphql-playground-middleware-express')
  .default;

const schemaWithResolvers = require('../graphql/schema');

const grapqlHttp = graphqlHTTP({
  schema: schemaWithResolvers,
});

const graphqlPlayground = expressPlayground({
  endpoint: '/graphql',
  settings: { 'schema.polling.enable': false },
});

module.exports = {
  grapqlHttp,
  graphqlPlayground,
};
