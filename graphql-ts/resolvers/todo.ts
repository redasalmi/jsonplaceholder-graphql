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

import { Todo } from '~/graphql-ts/schema';
import { UserInput } from '~/graphql-ts/resolvers';
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
class TodoInput {
  @Field()
  title: string;

  @Field()
  completed: boolean;

  @Field(() => UserInput)
  user: UserInput;
}

@Resolver()
export class TodoResolver {
  @Query(() => [Todo], { nullable: true })
  async todos(@Ctx() ctx: ContextInterface) {
    return ctx.prisma.todo.findMany({
      include,
    });
  }

  @Query(() => Todo, { nullable: true })
  async todo(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    return ctx.prisma.todo.findUnique({
      where: { id },
      include,
    });
  }

  @Mutation(() => Todo)
  async createTodo(@Arg('todo') todo: TodoInput, @Ctx() ctx: ContextInterface) {
    return {
      id: (await ctx.prisma.todo.count()) + 1,
      ...todo,
    };
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Arg('id') id: number,
    @Arg('todo') todo: TodoInput,
    @Ctx() ctx: ContextInterface,
  ) {
    const oldTodo = await ctx.prisma.todo.findUnique({
      where: { id },
      include,
    });

    if (!oldTodo) {
      throw new GraphQLError('Todo not found');
    }

    return {
      ...oldTodo,
      ...todo,
      user: {
        ...oldTodo.user,
        ...todo.user,
        company: {
          ...oldTodo.user.company,
          ...todo.user.company,
        },
        address: {
          ...oldTodo.user.address,
          ...todo.user.address,
          geo: {
            ...oldTodo.user.address?.geo,
            ...todo.user.address?.geo,
          },
        },
      },
    };
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    const todo = await ctx.prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new GraphQLError('Todo not found');
    }

    return true;
  }
}
