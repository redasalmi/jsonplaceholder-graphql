import { Resolver, Query, Arg } from 'type-graphql';

import { Comment } from '~/graphql-ts/schema';

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  async comments() {
    return [];
  }

  @Query(() => Comment, { nullable: true })
  async comment(@Arg('id') id: number): Promise<Comment | null> {
    return null;
  }
}
