import { Field, ObjectType, ID } from 'type-graphql';

import { User } from '~/graphql-ts/schema';

@ObjectType()
export class Album {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field(() => User)
  user: User;
}
