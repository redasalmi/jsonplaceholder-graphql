const { fetchPosts, fetchPost } = require('../../controllers/posts');
const { fetchComments, fetchComment } = require('../../controllers/comments');
const {
  fetchAlbums,
  fetchAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} = require('../../controllers/albums');
const { fetchPhotos, fetchPhoto } = require('../../controllers/photos');
const { fetchTodos, fetchTodo } = require('../../controllers/todos');
const { fetchUsers, fetchUser } = require('../../controllers/users');

const resolvers = {
  Query: {
    posts: async () => fetchPosts(),
    post: async (_, { id }) => fetchPost(id),

    comments: async () => fetchComments(),
    comment: async (_, { id }) => fetchComment(id),

    albums: async () => fetchAlbums(),
    album: async (_, { id }) => fetchAlbum(id),

    photos: async () => fetchPhotos(),
    photo: async (_, { id }) => fetchPhoto(id),

    todos: async () => fetchTodos(),
    todo: async (_, { id }) => fetchTodo(id),

    users: async () => fetchUsers(),
    user: async (_, { id }) => fetchUser(id),
  },

  Mutation: {
    createAlbum: (_, { title, user }) => createAlbum(title, user),
    updateAlbum: (_, { id, title, user }) => updateAlbum(id, title, user),
    deleteAlbum: (_, { id }) => deleteAlbum(id),
  },
};

module.exports = resolvers;
