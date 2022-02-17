import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import { Comment } from '~/graphql-ts/schema';
import type { ContextInterface } from '~/types';

@Resolver()
export class CommentResolver {
  @Query(() => [Comment], { nullable: true })
  async comments(@Ctx() ctx: ContextInterface) {
    return ctx.prisma.comment.findMany({
      include: {
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
      },
    });
  }

  @Query(() => Comment, { nullable: true })
  async comment(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    return ctx.prisma.comment.findUnique({
      where: { id },
      include: {
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
      },
    });
  }
}
