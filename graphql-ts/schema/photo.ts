import { Field, ObjectType, ID } from 'type-graphql';

import { Album } from '~/graphql-ts/schema';

@ObjectType()
export class Photo {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  thumbnailUrl: string;

  @Field(() => Album)
  album: Album;
}
