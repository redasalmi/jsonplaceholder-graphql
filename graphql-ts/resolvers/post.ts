import { Resolver, Query, Arg } from 'type-graphql';

import { Post } from '~/graphql-ts/schema';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts() {
    return [];
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('id') id: number): Promise<Post | null> {
    return null;
  }
}
