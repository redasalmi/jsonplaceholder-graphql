const fetch = require('node-fetch');

const resolvers = {
  Query: {
    users: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await res.json();

      return json;
    },
  },
};

module.exports = resolvers;
