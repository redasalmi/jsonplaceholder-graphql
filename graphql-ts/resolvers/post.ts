import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import { Post } from '~/graphql-ts/schema';
import type { ContextInterface } from '~/types';

@Resolver()
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  async posts(@Ctx() ctx: ContextInterface) {
    return ctx.prisma.post.findMany({
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
    });
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    return ctx.prisma.post.findUnique({
      where: { id },
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
    });
  }
}
