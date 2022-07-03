import { GraphQLError } from 'graphql';

import type { MercuriusContext } from 'mercurius';
import type {
  Comment,
  MutationcreateCommentArgs,
  MutationdeleteCommentArgs,
  MutationupdateCommentArgs,
  QuerycommentArgs,
  RequireFields,
} from '~/graphql/generated';

const include = {
  post: {
    include: {
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
    },
  },
};

export async function comments(
  _: {},
  __: {},
  { prisma }: MercuriusContext,
): Promise<Comment[]> {
  const comments = await prisma.comment.findMany({ include });

  if (!comments) {
    throw new GraphQLError('Comments not found');
  }

  return comments;
}

export async function comment(
  _: {},
  { id }: RequireFields<QuerycommentArgs, 'id'>,
  { prisma }: MercuriusContext,
): Promise<Comment> {
  const comment = await prisma.comment.findUnique({
    where: { id },
    include,
  });

  if (!comment) {
    throw new GraphQLError('Comment not found');
  }

  return comment;
}

export async function createComment(
  _: {},
  { comment }: RequireFields<MutationcreateCommentArgs, 'comment'>,
  { prisma }: MercuriusContext,
): Promise<Comment> {
  return {
    id: (await prisma.comment.count()) + 1,
    ...comment,
    post: {
      id: (await prisma.post.count()) + 1,
      ...comment.post,
      user: {
        id: (await prisma.user.count()) + 1,
        ...comment.post.user,
      },
    },
  };
}

export async function updateComment(
  _: {},
  { id, comment }: RequireFields<MutationupdateCommentArgs, 'id' | 'comment'>,
  { prisma }: MercuriusContext,
) {
  const oldComment = await prisma.comment.findUnique({
    where: { id },
    include,
  });

  if (!oldComment) {
    throw new GraphQLError('Comment not found');
  }

  return {
    ...oldComment,
    ...comment,
    post: {
      ...oldComment.post,
      ...comment.post,
      user: {
        ...oldComment.post.user,
        ...comment.post.user,
        company: {
          ...oldComment.post.user.company,
          ...comment.post.user.company,
        },
        address: {
          ...oldComment.post.user.address,
          ...comment.post.user.address,
          geo: {
            ...oldComment.post.user.address?.geo,
            ...comment.post.user.address?.geo,
          },
        },
      },
    },
  };
}

export async function deleteComment(
  _: {},
  { id }: RequireFields<MutationdeleteCommentArgs, 'id'>,
  { prisma }: MercuriusContext,
) {
  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) {
    throw new GraphQLError('Comment not found');
  }

  return true;
}
