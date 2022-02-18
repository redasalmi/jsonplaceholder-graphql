import { Field, ObjectType, ID } from 'type-graphql';

import { Album } from '~/graphql/schema';

@ObjectType()
export class Photo {
  @Field(() => ID)
  id: number;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String)
  url: string;

  @Field(() => String, { nullable: true })
  thumbnailUrl: string;

  @Field(() => Album)
  album: Album;
}
