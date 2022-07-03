import {
  albums,
  album,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from './album.resolvers';
import {
  comments,
  comment,
  createComment,
  updateComment,
  deleteComment,
} from './comment.resolvers';
import {
  photos,
  photo,
  createPhoto,
  updatePhoto,
  deletePhoto,
} from './photo.resolvers';
import {
  posts,
  post,
  createPost,
  updatePost,
  deletePost,
} from './post.resolvers';
import {
  todos,
  todo,
  createTodo,
  updateTodo,
  deleteTodo,
} from './todo.resolvers';
import {
  users,
  user,
  createUser,
  updateUser,
  deleteUser,
} from './user.resolvers';

import type { IResolvers } from 'mercurius';

const resolvers: IResolvers = {
  Query: {
    albums,
    album,

    comments,
    comment,

    photos,
    photo,

    posts,
    post,

    todos,
    todo,

    users,
    user,
  },
  Mutation: {
    createAlbum,
    updateAlbum,
    deleteAlbum,

    createComment,
    updateComment,
    deleteComment,

    createPhoto,
    updatePhoto,
    deletePhoto,

    createPost,
    updatePost,
    deletePost,

    createTodo,
    updateTodo,
    deleteTodo,

    createUser,
    updateUser,
    deleteUser,
  },
};

export default resolvers;
