const { GraphQLError } = require('graphql');

const { fetchData, fetchById, getPropertyLength } = require('../utils/fetch');
const { fetchPost } = require('./posts');

const fetchComments = () => {
  const comments = fetchData('comments');

  const postIds = [];
  comments.forEach(({ postId }) => {
    if (!postIds.includes(postId)) {
      postIds.push(postId);
    }
  });

  const posts = postIds.map((id) => fetchPost(id));
  comments.map(
    (comment) => (comment.post = posts.find(({ id }) => id === comment.postId))
  );

  return comments;
};

const fetchComment = (id) => {
  const comment = fetchById('comments', id);

  if (comment === undefined) {
    throw new GraphQLError('Comment not found');
  }

  const post = fetchPost(comment.postId);
  comment.post = post;

  return comment;
};

const createComment = (comment, post) => {
  const commentId = getPropertyLength('comments') + 1;
  const postId = getPropertyLength('posts') + 1;
  const userId = getPropertyLength('users') + 1;

  const newComment = {
    id: commentId,
    ...comment,
    post: {
      id: postId,
      ...post,

      user: {
        id: userId,
        ...post.user,
      },
    },
  };

  return newComment;
};

const updateComment = (id, comment, post) => {
  const com = fetchComment(id);

  const updatedComment = {
    ...com,
    ...comment,
    post: {
      ...com.post,
      ...post,

      user: {
        ...com.post.user,
        ...post.user,
      },
    },
  };

  return updatedComment;
};

const deleteComment = (id) => {
  fetchComment(id);

  return true;
};

module.exports = {
  fetchComments,
  fetchComment,
  createComment,
  updateComment,
  deleteComment,
};
