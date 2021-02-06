const fetchData = require('../../utils/fetch');
const { fetchPosts, fetchPost } = require('../../controllers/posts');
const { fetchComments, fetchComment } = require('../../controllers/comments');

const resolvers = {
  Query: {
    users: async () => fetchData('/users'),
    user: async (_, { id }) => fetchData(`/users/${id}`),

    posts: async () => fetchPosts(),
    post: async (_, { id }) => fetchPost(id),

    comments: async () => fetchComments(),
    comment: async (_, { id }) => fetchComment(id),
  },
};

module.exports = resolvers;
