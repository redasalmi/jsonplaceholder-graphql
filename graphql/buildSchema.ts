import { gql } from 'mercurius-codegen';

import { inputs, typeDefs } from './schema';

const queries = gql`
  type Query {
    albums: [Album!]!
    album(id: Int!): Album!

    comments: [Comment!]!
    comment(id: Int!): Comment!

    photos: [Photo!]!
    photo(id: Int!): Photo!

    posts: [Post!]!
    post(id: Int!): Post!

    todos: [Todo!]!
    todo(id: Int!): Todo!

    users: [User!]!
    user(id: Int!): User!
  }
`;

const mutations = gql`
  type Mutation {
    createAlbum(album: AlbumInput!): Album!
    updateAlbum(id: Int!, album: AlbumInput!): Album!
    deleteAlbum(id: Int!): Boolean

    createComment(comment: CommentInput!): Comment!
    updateComment(id: Int!, comment: CommentInput!): Comment!
    deleteComment(id: Int!): Boolean

    createPhoto(photo: PhotoInput!): Photo!
    updatePhoto(id: Int!, photo: PhotoInput!): Photo!
    deletePhoto(id: Int!): Boolean

    createPost(post: PostInput!): Post!
    updatePost(id: Int!, post: PostInput!): Post!
    deletePost(id: Int!): Boolean

    createTodo(todo: TodoInput!): Todo!
    updateTodo(id: Int!, todo: TodoInput!): Todo!
    deleteTodo(id: Int!): Boolean

    createUser(user: UserInput!): User!
    updateUser(id: Int!, user: UserInput!): User!
    deleteUser(id: Int!): Boolean
  }
`;

const schema = gql`
  ${typeDefs}
  ${inputs}
  ${queries}
  ${mutations}
`;

export default schema;
