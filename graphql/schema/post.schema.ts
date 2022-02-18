import { Field, ObjectType, ID } from 'type-graphql';

import { User } from '~/graphql/schema';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field(() => User)
  user: User;
}
