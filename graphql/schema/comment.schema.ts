import { Field, ObjectType, ID } from 'type-graphql';

import { Post } from '~/graphql/schema';

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  body: string;

  @Field(() => Post)
  post: Post;
}
