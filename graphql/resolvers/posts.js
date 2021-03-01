const {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
} = require('../../controllers/posts');

const postsResolver = {
  Query: {
    posts: async () => fetchPosts(),
    post: async (_, { id }) => fetchPost(id),
  },
  Mutation: {
    createPost: (_, { post }) => createPost(post),
    updatePost: (_, { id, post }) => updatePost(id, post),
    deletePost: (_, { id }) => deletePost(id),
  },
};

module.exports = postsResolver;
