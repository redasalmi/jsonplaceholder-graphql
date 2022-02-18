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
  @Field()
  title: string;

  @Field()
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

  @Query(() => Post, { nullable: true })
  async post(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    return ctx.prisma.post.findUnique({
      where: { id },
      include,
    });
  }

  @Mutation(() => Post)
  async createPost(@Arg('post') post: PostInput, @Ctx() ctx: ContextInterface) {
    return {
      id: (await ctx.prisma.post.count()) + 1,
      ...post,
    };
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg('id') id: number,
    @Arg('post') post: PostInput,
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
  async deletePost(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    const post = await ctx.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new GraphQLError('Post not found');
    }

    return true;
  }
}
