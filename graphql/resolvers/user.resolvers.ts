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
  @Field(() => String)
  lat: string;

  @Field(() => String)
  lng: string;
}

@InputType()
class AddressInput {
  @Field(() => String, { nullable: true })
  street?: string;

  @Field(() => String, { nullable: true })
  suite?: string;

  @Field(() => String)
  city: string;

  @Field(() => String, { nullable: true })
  zipcode?: string;

  @Field(() => GeoLocalisationInput, { nullable: true })
  geo?: GeoLocalisationInput;
}

@InputType()
class CompanyInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  catchPhrase?: string;

  @Field(() => String, { nullable: true })
  bs?: string;
}

@InputType()
export class UserInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String)
  username: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  address?: AddressInput;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  website?: string;

  @Field(() => String, { nullable: true })
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
  async user(
    @Arg('id', () => Number) id: number,
    @Ctx() ctx: ContextInterface,
  ) {
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
  async createUser(
    @Arg('user', () => UserInput) user: UserInput,
    @Ctx() ctx: ContextInterface,
  ) {
    return {
      id: (await ctx.prisma.user.count()) + 1,
      ...user,
    };
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('id', () => Number) id: number,
    @Arg('user', () => UserInput) user: UserInput,
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
  async deleteUser(
    @Arg('id', () => Number) id: number,
    @Ctx() ctx: ContextInterface,
  ) {
    const user = await ctx.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new GraphQLError('User not found');
    }

    return true;
  }
}
