import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import { Todo } from '~/graphql-ts/schema';
import type { ContextInterface } from '~/types';

@Resolver()
export class TodoResolver {
  @Query(() => [Todo], { nullable: true })
  async todos(@Ctx() ctx: ContextInterface) {
    return ctx.prisma.todo.findMany({
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

  @Query(() => Todo, { nullable: true })
  async todo(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    return ctx.prisma.todo.findUnique({
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
