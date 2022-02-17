import { Resolver, Query, Arg } from 'type-graphql';

import { Photo } from '~/graphql-ts/schema';

@Resolver()
export class PhotoResolver {
  @Query(() => [Photo])
  async photos() {
    return [];
  }

  @Query(() => Photo, { nullable: true })
  async photo(@Arg('id') id: number): Promise<Photo | null> {
    return null;
  }
}
