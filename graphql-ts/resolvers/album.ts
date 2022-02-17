import { Resolver, Query, Arg } from 'type-graphql';

import { Album } from '~/graphql-ts/schema';

@Resolver()
export class AlbumResolver {
  @Query(() => [Album])
  async albums() {
    return [];
  }

  @Query(() => Album, { nullable: true })
  async album(@Arg('id') id: number): Promise<Album | null> {
    return null;
  }
}
