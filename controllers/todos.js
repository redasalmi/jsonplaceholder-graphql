const { fetchData, fetchById } = require('../utils/fetch');
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
  const user = fetchUser(todo.userId);
  todo.user = user;

  return todo;
};

module.exports = { fetchTodos, fetchTodo };
