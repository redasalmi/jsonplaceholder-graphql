const fetchData = require('../../utils/fetch');
const { fetchPosts, fetchPost } = require('../../controllers/posts');

const resolvers = {
  Query: {
    users: async () => fetchData('/users'),
    user: async (_, { id }) => fetchData(`/users/${id}`),

    posts: async () => fetchPosts(),
    post: async (_, { id }) => fetchPost(id),
  },
};

module.exports = resolvers;
