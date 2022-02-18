import { GraphQLError } from 'graphql';
import {
  Resolver,
  Query,
  Arg,
  Ctx,
  Mutation,
  InputType,
  Field,
} from 'type-graphql';

import { Post } from '~/graphql/schema';
import { UserInput } from '~/graphql/resolvers';
import type { ContextInterface } from '~/types';

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

@InputType()
export class PostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;

  @Field(() => UserInput)
  user: UserInput;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  async posts(@Ctx() ctx: ContextInterface) {
    return ctx.prisma.post.findMany({
      include,
    });
  }

  @Query(() => Post)
  async post(
    @Arg('id', () => Number) id: number,
    @Ctx() ctx: ContextInterface,
  ) {
    const post = await ctx.prisma.post.findUnique({
      where: { id },
      include,
    });

    if (!post) {
      throw new GraphQLError('Post not found');
    }

    return post;
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('post', () => PostInput) post: PostInput,
    @Ctx() ctx: ContextInterface,
  ) {
    return {
      id: (await ctx.prisma.post.count()) + 1,
      ...post,
    };
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg('id', () => Number) id: number,
    @Arg('post', () => PostInput) post: PostInput,
    @Ctx() ctx: ContextInterface,
  ) {
    const oldPost = await ctx.prisma.post.findUnique({
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

  @Mutation(() => Boolean)
  async deletePost(
    @Arg('id', () => Number) id: number,
    @Ctx() ctx: ContextInterface,
  ) {
    const post = await ctx.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new GraphQLError('Post not found');
    }

    return true;
  }
}
