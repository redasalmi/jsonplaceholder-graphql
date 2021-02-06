const fetchData = require('../utils/fetch');

const fetchTodos = async () => {
  const todos = await fetchData('/todos');

  const userIds = [];
  todos.forEach(({ userId }) => {
    if (!userIds.includes(userId)) {
      userIds.push(userId);
    }
  });

  const users = await Promise.all(
    userIds.map(async (id) => fetchData(`/users/${id}`))
  );

  todos.map((todo) => (todo.user = users.find(({ id }) => id === todo.userId)));

  return todos;
};

const fetchTodo = async (id) => {
  const todo = await fetchData(`/todos/${id}`);
  const user = await fetchData(`/users/${todo.userId}`);
  todo.user = user;

  return todo;
};

module.exports = { fetchTodos, fetchTodo };
