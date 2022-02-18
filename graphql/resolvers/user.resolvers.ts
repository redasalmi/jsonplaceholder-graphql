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

import { User } from '~/graphql/schema';
import type { ContextInterface } from '~/types';

const include = {
  company: true,
  address: {
    include: {
      geo: true,
    },
  },
};

@InputType()
class GeoLocalisationInput {
  @Field()
  lat: string;

  @Field()
  lng: string;
}

@InputType()
class AddressInput {
  @Field({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  suite?: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  zipcode?: string;

  @Field({ nullable: true })
  geo?: GeoLocalisationInput;
}

@InputType()
class CompanyInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  catchPhrase?: string;

  @Field({ nullable: true })
  bs?: string;
}

@InputType()
export class UserInput {
  @Field({ nullable: true })
  name?: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  address?: AddressInput;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  company?: CompanyInput;
}

@Resolver()
export class UserResolver {
  @Query(() => [User], { nullable: true })
  async users(@Ctx() ctx: ContextInterface) {
    return ctx.prisma.user.findMany({
      include,
    });
  }

  @Query(() => User)
  async user(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    const user = await ctx.prisma.user.findUnique({
      where: { id },
      include,
    });

    if (!user) {
      throw new GraphQLError('User not found');
    }

    return user;
  }

  @Mutation(() => User)
  async createUser(@Arg('user') user: UserInput, @Ctx() ctx: ContextInterface) {
    return {
      id: (await ctx.prisma.user.count()) + 1,
      ...user,
    };
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('id') id: number,
    @Arg('user') user: UserInput,
    @Ctx() ctx: ContextInterface,
  ) {
    const oldUser = await ctx.prisma.user.findUnique({
      where: { id },
      include,
    });

    if (!oldUser) {
      throw new GraphQLError('User not found');
    }

    return {
      ...oldUser,
      ...user,
      company: {
        ...oldUser.company,
        ...user.company,
      },
      address: {
        ...oldUser.address,
        ...user.address,
        geo: {
          ...oldUser.address?.geo,
          ...user.address?.geo,
        },
      },
    };
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    const user = await ctx.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new GraphQLError('User not found');
    }

    return true;
  }
}
