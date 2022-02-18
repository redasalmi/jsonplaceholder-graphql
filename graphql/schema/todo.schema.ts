import { Field, ObjectType, ID } from 'type-graphql';

import { User } from '~/graphql/schema';

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => Boolean)
  completed: boolean;

  @Field(() => User)
  user: User;
}
