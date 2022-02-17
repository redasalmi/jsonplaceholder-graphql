import { Resolver, Query, Arg } from 'type-graphql';

import { Todo } from '~/graphql-ts/schema';

@Resolver()
export class AlbumResolver {
  @Query(() => [Todo])
  async todos() {
    return [];
  }

  @Query(() => Todo, { nullable: true })
  async todo(@Arg('id') id: number): Promise<Todo | null> {
    return null;
  }
}
