import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import { Album } from '~/graphql-ts/schema';
import type { ContextInterface } from '~/types';

@Resolver()
export class AlbumResolver {
  @Query(() => [Album], { nullable: true })
  async albums(@Ctx() ctx: ContextInterface) {
    return ctx.prisma.album.findMany({
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

  @Query(() => Album, { nullable: true })
  async album(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    return ctx.prisma.album.findUnique({
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
