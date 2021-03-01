const { GraphQLError } = require('graphql');

const { fetchData, fetchById, getPropertyLength } = require('../utils/fetch');
const { fetchUser } = require('./users');

const fetchTodos = () => {
  const todos = fetchData('todos');

  const userIds = [];
  todos.forEach(({ userId }) => {
    if (!userIds.includes(userId)) {
      userIds.push(userId);
    }
  });

  const users = userIds.map((id) => fetchUser(id));
  todos.map((todo) => (todo.user = users.find(({ id }) => id === todo.userId)));

  return todos;
};

const fetchTodo = (id) => {
  const todo = fetchById('todos', id);

  if (todo === undefined) {
    throw new GraphQLError('Todo not found');
  }

  const user = fetchUser(todo.userId);
  todo.user = user;

  return todo;
};

const createTodo = (todoParam) => {
  const todoId = getPropertyLength('todos') + 1;
  const userId = getPropertyLength('users') + 1;

  const newTodo = {
    id: todoId,
    ...todoParam,

    user: {
      id: userId,
      ...todoParam.user,
    },
  };

  return newTodo;
};

const updateTodo = (id, todoParam) => {
  const todo = fetchTodo(id);

  const updatedTodo = {
    ...todo,
    ...todoParam,

    user: {
      ...todo.user,
      ...todoParam.user,
    },
  };

  return updatedTodo;
};

const deleteTodo = (id) => {
  fetchTodo(id);

  return true;
};

module.exports = { fetchTodos, fetchTodo, createTodo, updateTodo, deleteTodo };
