const fetchData = require('../utils/fetch');
const { fetchPost } = require('./posts');

const fetchComments = async () => {
  const comments = await fetchData('/comments');

  const postIds = [];
  comments.forEach(({ postId }) => {
    if (!postIds.includes(postId)) {
      postIds.push(postId);
    }
  });

  const posts = await Promise.all(postIds.map(async (id) => fetchPost(id)));
  comments.map(
    (comment) => (comment.post = posts.find(({ id }) => id === comment.postId))
  );

  return comments;
};

const fetchComment = async (id) => {
  const comment = await fetchData(`/comments/${id}`);
  const post = await fetchPost(comment.postId);
  comment.post = post;

  return comment;
};

module.exports = { fetchComments, fetchComment };
