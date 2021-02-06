const fetchData = require('../utils/fetch');

const fetchPosts = async () => {
  const posts = await fetchData('/posts');

  const userIds = [];
  posts.forEach(({ userId }) => {
    if (!userIds.includes(userId)) {
      userIds.push(userId);
    }
  });

  const users = await Promise.all(
    userIds.map(async (id) => fetchData(`/users/${id}`))
  );

  posts.map((post) => (post.user = users.find(({ id }) => id === post.userId)));

  return posts;
};

const fetchPost = async (id) => {
  const post = await fetchData(`/posts/${id}`);
  const user = await fetchData(`/users/${post.userId}`);
  post.user = user;

  return post;
};

module.exports = { fetchPosts, fetchPost };
