const fetchData = require('../utils/fetch');
const { fetchUser } = require('./users');

const fetchTodos = async () => {
  const todos = await fetchData('/todos');

  const userIds = [];
  todos.forEach(({ userId }) => {
    if (!userIds.includes(userId)) {
      userIds.push(userId);
    }
  });

  const users = await Promise.all(userIds.map(async (id) => fetchUser(id)));
  todos.map((todo) => (todo.user = users.find(({ id }) => id === todo.userId)));

  return todos;
};

const fetchTodo = async (id) => {
  const todo = await fetchData(`/todos/${id}`);
  const user = await fetchUser(todo.userId);
  todo.user = user;

  return todo;
};

module.exports = { fetchTodos, fetchTodo };
