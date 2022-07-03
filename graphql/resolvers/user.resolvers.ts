import { GraphQLError } from 'graphql';

import type { MercuriusContext } from 'mercurius';
import type {
  MutationcreateUserArgs,
  MutationdeleteUserArgs,
  MutationupdateUserArgs,
  QueryuserArgs,
  RequireFields,
  User,
} from '~/graphql/generated';

const include = {
  company: true,
  address: {
    include: {
      geo: true,
    },
  },
};

export async function users(
  _: {},
  __: {},
  { prisma }: MercuriusContext,
): Promise<User[]> {
  const users = await prisma.user.findMany({ include });

  if (!users) {
    throw new GraphQLError('Users not found');
  }

  return users;
}

export async function user(
  _: {},
  { id }: RequireFields<QueryuserArgs, 'id'>,
  { prisma }: MercuriusContext,
): Promise<User> {
  const user = await prisma.user.findUnique({
    where: { id },
    include,
  });

  if (!user) {
    throw new GraphQLError('User not found');
  }

  return user;
}

export async function createUser(
  _: {},
  { user }: RequireFields<MutationcreateUserArgs, 'user'>,
  { prisma }: MercuriusContext,
): Promise<User> {
  return {
    id: (await prisma.user.count()) + 1,
    ...user,
  };
}

export async function updateUser(
  _: {},
  { id, user }: RequireFields<MutationupdateUserArgs, 'id' | 'user'>,
  { prisma }: MercuriusContext,
) {
  const oldUser = await prisma.user.findUnique({
    where: { id },
    include,
  });

  if (!oldUser) {
    throw new GraphQLError('User not found');
  }

  return {
    ...oldUser,
    ...user,
    company: {
      ...oldUser.company,
      ...user.company,
    },
    address: {
      ...oldUser.address,
      ...user.address,
      geo: {
        ...oldUser.address?.geo,
        ...user.address?.geo,
      },
    },
  };
}

export async function deleteUser(
  _: {},
  { id }: RequireFields<MutationdeleteUserArgs, 'id'>,
  { prisma }: MercuriusContext,
) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new GraphQLError('User not found');
  }

  return true;
}
