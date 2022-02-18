import { Field, ObjectType, ID } from 'type-graphql';

import { User } from '~/graphql/schema';

@ObjectType()
export class Album {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => User)
  user: User;
}
