const { fetchData, fetchById } = require('../utils/fetch');
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
  const post = fetchPost(comment.postId);
  comment.post = post;

  return comment;
};

module.exports = { fetchComments, fetchComment };
