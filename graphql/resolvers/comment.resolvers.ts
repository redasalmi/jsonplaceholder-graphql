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
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
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

  @Query(() => Comment, { nullable: true })
  async comment(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    return ctx.prisma.comment.findUnique({
      where: { id },
      include,
    });
  }

  @Mutation(() => Comment)
  async createComment(
    @Arg('comment') comment: CommentInput,
    @Ctx() ctx: ContextInterface,
  ) {
    return {
      id: (await ctx.prisma.comment.count()) + 1,
      ...comment,
    };
  }

  @Mutation(() => Comment)
  async updateComment(
    @Arg('id') id: number,
    @Arg('comment') comment: CommentInput,
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
  async deleteComment(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    const comment = await ctx.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new GraphQLError('Comment not found');
    }

    return true;
  }
}
