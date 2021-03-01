const {
  fetchTodos,
  fetchTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../../controllers/todos');

const todosResolver = {
  Query: {
    todos: async () => fetchTodos(),
    todo: async (_, { id }) => fetchTodo(id),
  },
  Mutation: {
    createTodo: (_, { todo }) => createTodo(todo),
    updateTodo: (_, { id, todo }) => updateTodo(id, todo),
    deleteTodo: (_, { id }) => deleteTodo(id),
  },
};

module.exports = todosResolver;
