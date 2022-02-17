import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import { Photo } from '~/graphql-ts/schema';
import type { ContextInterface } from '~/types';

@Resolver()
export class PhotoResolver {
  @Query(() => [Photo], { nullable: true })
  async photos(@Ctx() ctx: ContextInterface) {
    return ctx.prisma.photo.findMany({
      include: {
        album: {
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

  @Query(() => Photo, { nullable: true })
  async photo(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    return ctx.prisma.photo.findUnique({
      where: { id },
      include: {
        album: {
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
