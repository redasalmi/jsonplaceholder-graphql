const {
  fetchComments,
  fetchComment,
  createComment,
  updateComment,
  deleteComment,
} = require('../../controllers/comments');

const commentsResolver = {
  Query: {
    comments: async () => fetchComments(),
    comment: async (_, { id }) => fetchComment(id),
  },
  Mutation: {
    createComment: (_, { comment, post }) => createComment(comment, post),
    updateComment: (_, { id, comment, post }) =>
      updateComment(id, comment, post),
    deleteComment: (_, { id }) => deleteComment(id),
  },
};

module.exports = commentsResolver;
