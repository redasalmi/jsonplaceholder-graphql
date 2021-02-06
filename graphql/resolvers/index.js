const fetchData = require('../../utils/fetch');

const resolvers = {
  Query: {
    users: async () => fetchData('/users'),
    user: async (_, { id }) => fetchData(`/users/${id}`),
  },
};

module.exports = resolvers;
