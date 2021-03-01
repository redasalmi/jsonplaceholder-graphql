const { GraphQLError } = require('graphql');

const { fetchData, fetchById, getPropertyLength } = require('../utils/fetch');

const fetchUsers = () => fetchData('users');

const fetchUser = (id) => {
  const user = fetchById('users', id);

  if (user === undefined) {
    throw new GraphQLError('User not found');
  }

  return user;
};

const createUser = (userParam) => {
  const userId = getPropertyLength('users') + 1;

  const newUser = {
    id: userId,
    ...userParam,
  };

  return newUser;
};

const updateUser = (id, userParam) => {
  const user = fetchUser(id);

  const updatedUser = {
    ...user,
    ...userParam,
  };

  return updatedUser;
};

const deleteUser = (id) => {
  fetchUser(id);

  return true;
};

module.exports = { fetchUsers, fetchUser, createUser, updateUser, deleteUser };
