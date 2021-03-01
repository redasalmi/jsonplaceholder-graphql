const {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
} = require('../../controllers/posts');
const {
  fetchComments,
  fetchComment,
  createComment,
  updateComment,
  deleteComment,
} = require('../../controllers/comments');
const {
  fetchAlbums,
  fetchAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} = require('../../controllers/albums');
const {
  fetchPhotos,
  fetchPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
} = require('../../controllers/photos');
const {
  fetchTodos,
  fetchTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../../controllers/todos');
const {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/users');

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
    createComment: (_, { comment, post }) => createComment(comment, post),
    updateComment: (_, { id, comment, post }) =>
      updateComment(id, comment, post),
    deleteComment: (_, { id }) => deleteComment(id),

    createAlbum: (_, { album }) => createAlbum(album),
    updateAlbum: (_, { id, album }) => updateAlbum(id, album),
    deleteAlbum: (_, { id }) => deleteAlbum(id),

    createPhoto: (_, { photo }) => createPhoto(photo),
    updatePhoto: (_, { id, photo }) => updatePhoto(id, photo),
    deletePhoto: (_, { id }) => deletePhoto(id),

    createPost: (_, { post }) => createPost(post),
    updatePost: (_, { id, post }) => updatePost(id, post),
    deletePost: (_, { id }) => deletePost(id),

    createTodo: (_, { todo }) => createTodo(todo),
    updateTodo: (_, { id, todo }) => updateTodo(id, todo),
    deleteTodo: (_, { id }) => deleteTodo(id),

    createUser: (_, { user }) => createUser(user),
    updateUser: (_, { id, user }) => updateUser(id, user),
    deleteUser: (_, { id }) => deleteUser(id),
  },
};

module.exports = resolvers;
