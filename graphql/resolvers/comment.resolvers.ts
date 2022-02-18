import { GraphQLError } from 'graphql';
import {
  Resolver,
  Query,
  Arg,
  Ctx,
  InputType,
  Field,
  Mutation,
} from 'type-graphql';

import { Comment } from '~/graphql/schema';
import { PostInput } from '~/graphql/resolvers';
import type { ContextInterface } from '~/types';

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

@InputType()
class CommentInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  body: string;

  @Field(() => PostInput)
  post: PostInput;
}

@Resolver()
export class CommentResolver {
  @Query(() => [Comment], { nullable: true })
  async comments(@Ctx() ctx: ContextInterface) {
    return ctx.prisma.comment.findMany({
      include,
    });
  }

  @Query(() => Comment)
  async comment(
    @Arg('id', () => Number) id: number,
    @Ctx() ctx: ContextInterface,
  ) {
    const comment = await ctx.prisma.comment.findUnique({
      where: { id },
      include,
    });

    if (!comment) {
      throw new GraphQLError('Comment not found');
    }

    return comment;
  }

  @Mutation(() => Comment)
  async createComment(
    @Arg('comment', () => CommentInput) comment: CommentInput,
    @Ctx() ctx: ContextInterface,
  ) {
    return {
      id: (await ctx.prisma.comment.count()) + 1,
      ...comment,
    };
  }

  @Mutation(() => Comment)
  async updateComment(
    @Arg('id', () => Number) id: number,
    @Arg('comment', () => CommentInput) comment: CommentInput,
    @Ctx() ctx: ContextInterface,
  ) {
    const oldComment = await ctx.prisma.comment.findUnique({
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

  @Mutation(() => Boolean)
  async deleteComment(
    @Arg('id', () => Number) id: number,
    @Ctx() ctx: ContextInterface,
  ) {
    const comment = await ctx.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new GraphQLError('Comment not found');
    }

    return true;
  }
}
