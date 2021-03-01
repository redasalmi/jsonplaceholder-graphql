const albumsResolver = require('./albums');
const commentsResolver = require('./comments');
const photosResolver = require('./photos');
const postsResolver = require('./posts');
const todosResolver = require('./todos');
const usersResolver = require('./users');

const resolvers = {
  Query: {
    ...albumsResolver.Query,
    ...commentsResolver.Query,
    ...photosResolver.Query,
    ...postsResolver.Query,
    ...todosResolver.Query,
    ...usersResolver.Query,
  },

  Mutation: {
    ...albumsResolver.Mutation,
    ...commentsResolver.Mutation,
    ...photosResolver.Mutation,
    ...postsResolver.Mutation,
    ...todosResolver.Mutation,
    ...usersResolver.Mutation,
  },
};

module.exports = resolvers;
