const {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/users');

const usersResolver = {
  Query: {
    users: async () => fetchUsers(),
    user: async (_, { id }) => fetchUser(id),
  },
  Mutation: {
    createUser: (_, { user }) => createUser(user),
    updateUser: (_, { id, user }) => updateUser(id, user),
    deleteUser: (_, { id }) => deleteUser(id),
  },
};

module.exports = usersResolver;
