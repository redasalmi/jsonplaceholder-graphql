import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import { User } from '~/graphql-ts/schema';
import type { ContextInterface } from '~/types';

@Resolver()
export class UserResolver {
  @Query(() => [User], { nullable: true })
  async users(@Ctx() ctx: ContextInterface) {
    return ctx.prisma.user.findMany({
      include: {
        company: true,
        address: {
          include: {
            geo: true,
          },
        },
      },
    });
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    return ctx.prisma.user.findUnique({
      where: { id },
      include: {
        company: true,
        address: {
          include: {
            geo: true,
          },
        },
      },
    });
  }
}
