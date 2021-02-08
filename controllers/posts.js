const { fetchData, fetchById } = require('../utils/fetch');
const { fetchUser } = require('./users');

const fetchPosts = () => {
  const posts = fetchData('posts');

  const userIds = [];
  posts.forEach(({ userId }) => {
    if (!userIds.includes(userId)) {
      userIds.push(userId);
    }
  });

  const users = userIds.map((id) => fetchUser(id));
  posts.map((post) => (post.user = users.find(({ id }) => id === post.userId)));

  return posts;
};

const fetchPost = (id) => {
  const post = fetchById('posts', id);
  const user = fetchUser(post.userId);
  post.user = user;

  return post;
};

module.exports = { fetchPosts, fetchPost };
