import { GraphQLError } from 'graphql';

import type { MercuriusContext } from 'mercurius';
import type {
  MutationcreateTodoArgs,
  MutationdeleteTodoArgs,
  MutationupdateTodoArgs,
  QuerytodoArgs,
  RequireFields,
  Todo,
} from '~/graphql/generated';

const include = {
  user: {
    include: {
      company: true,
      address: {
        include: {
          geo: true,
        },
      },
    },
  },
};

export async function todos(
  _: {},
  __: {},
  { prisma }: MercuriusContext,
): Promise<Todo[]> {
  const todos = await prisma.todo.findMany({ include });

  if (!todos) {
    throw new GraphQLError('Todos not found');
  }

  return todos;
}

export async function todo(
  _: {},
  { id }: RequireFields<QuerytodoArgs, 'id'>,
  { prisma }: MercuriusContext,
): Promise<Todo> {
  const todo = await prisma.todo.findUnique({
    where: { id },
    include,
  });

  if (!todo) {
    throw new GraphQLError('Todo not found');
  }

  return todo;
}

export async function createTodo(
  _: {},
  { todo }: RequireFields<MutationcreateTodoArgs, 'todo'>,
  { prisma }: MercuriusContext,
): Promise<Todo> {
  return {
    id: (await prisma.todo.count()) + 1,
    ...todo,
    user: {
      id: (await prisma.user.count()) + 1,
      ...todo.user,
    },
  };
}

export async function updateTodo(
  _: {},
  { id, todo }: RequireFields<MutationupdateTodoArgs, 'id' | 'todo'>,
  { prisma }: MercuriusContext,
) {
  const oldTodo = await prisma.todo.findUnique({
    where: { id },
    include,
  });

  if (!oldTodo) {
    throw new GraphQLError('Todo not found');
  }

  return {
    ...oldTodo,
    ...todo,
    user: {
      ...oldTodo.user,
      ...todo.user,
      company: {
        ...oldTodo.user.company,
        ...todo.user.company,
      },
      address: {
        ...oldTodo.user.address,
        ...todo.user.address,
        geo: {
          ...oldTodo.user.address?.geo,
          ...todo.user.address?.geo,
        },
      },
    },
  };
}

export async function deleteTodo(
  _: {},
  { id }: RequireFields<MutationdeleteTodoArgs, 'id'>,
  { prisma }: MercuriusContext,
) {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    throw new GraphQLError('Todo not found');
  }

  return true;
}
