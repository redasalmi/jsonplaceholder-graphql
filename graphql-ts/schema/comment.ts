import { Field, ObjectType, ID } from 'type-graphql';

import { Post } from '~/graphql-ts/schema';

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  body: string;

  @Field(() => Post)
  post: Post;
}
