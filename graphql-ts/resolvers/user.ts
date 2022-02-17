import { Resolver, Query, Arg } from 'type-graphql';

import { User } from '~/graphql-ts/schema';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return [];
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: number): Promise<User | null> {
    return null;
  }
}
