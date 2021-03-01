const { GraphQLError } = require('graphql');

const { fetchData, fetchById, getPropertyLength } = require('../utils/fetch');
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

  if (post === undefined) {
    throw new GraphQLError('Post not found');
  }

  const user = fetchUser(post.userId);
  post.user = user;

  return post;
};

const createPost = (postParam) => {
  const postId = getPropertyLength('posts') + 1;
  const userId = getPropertyLength('users') + 1;

  const newPost = {
    id: postId,
    ...postParam,

    user: {
      id: userId,
      ...postParam.user,
    },
  };

  return newPost;
};

const updatePost = (id, postParam) => {
  const post = fetchPost(id);

  const updatedPost = {
    ...post,
    ...postParam,

    user: {
      ...post.user,
      ...postParam.user,
    },
  };

  return updatedPost;
};

const deletePost = (id) => {
  fetchPost(id);

  return true;
};

module.exports = { fetchPosts, fetchPost, createPost, updatePost, deletePost };
