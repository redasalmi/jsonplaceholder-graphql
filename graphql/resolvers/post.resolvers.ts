import { GraphQLError } from 'graphql';

import type { MercuriusContext } from 'mercurius';
import type {
  MutationcreatePostArgs,
  MutationdeletePostArgs,
  MutationupdatePostArgs,
  QuerypostArgs,
  Post,
  RequireFields,
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

export async function posts(
  _: {},
  __: {},
  { prisma }: MercuriusContext,
): Promise<Post[]> {
  const posts = await prisma.post.findMany({ include });

  if (!posts) {
    throw new GraphQLError('Posts not found');
  }

  return posts;
}

export async function post(
  _: {},
  { id }: RequireFields<QuerypostArgs, 'id'>,
  { prisma }: MercuriusContext,
): Promise<Post> {
  const post = await prisma.post.findUnique({
    where: { id },
    include,
  });

  if (!post) {
    throw new GraphQLError('Post not found');
  }

  return post;
}

export async function createPost(
  _: {},
  { post }: RequireFields<MutationcreatePostArgs, 'post'>,
  { prisma }: MercuriusContext,
): Promise<Post> {
  return {
    id: (await prisma.post.count()) + 1,
    ...post,
    user: {
      id: (await prisma.user.count()) + 1,
      ...post.user,
    },
  };
}

export async function updatePost(
  _: {},
  { id, post }: RequireFields<MutationupdatePostArgs, 'id' | 'post'>,
  { prisma }: MercuriusContext,
) {
  const oldPost = await prisma.post.findUnique({
    where: { id },
    include,
  });

  if (!oldPost) {
    throw new GraphQLError('Post not found');
  }

  return {
    ...oldPost,
    ...post,
    user: {
      ...oldPost.user,
      ...post.user,
      company: {
        ...oldPost.user.company,
        ...post.user.company,
      },
      address: {
        ...oldPost.user.address,
        ...post.user.address,
        geo: {
          ...oldPost.user.address?.geo,
          ...post.user.address?.geo,
        },
      },
    },
  };
}

export async function deletePost(
  _: {},
  { id }: RequireFields<MutationdeletePostArgs, 'id'>,
  { prisma }: MercuriusContext,
) {
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    throw new GraphQLError('Post not found');
  }

  return true;
}
