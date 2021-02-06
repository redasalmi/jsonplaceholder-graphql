const fetchData = require('../../utils/fetch');
const { fetchPosts, fetchPost } = require('../../controllers/posts');
const { fetchComments, fetchComment } = require('../../controllers/comments');
const { fetchAlbums, fetchAlbum } = require('../../controllers/albums');
const { fetchPhotos, fetchPhoto } = require('../../controllers/photos');
const { fetchTodos, fetchTodo } = require('../../controllers/todos');

const resolvers = {
  Query: {
    users: async () => fetchData('/users'),
    user: async (_, { id }) => fetchData(`/users/${id}`),

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
  },
};

module.exports = resolvers;
