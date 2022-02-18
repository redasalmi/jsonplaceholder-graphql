import { Field, ObjectType, ID } from 'type-graphql';

import { User } from '~/graphql/schema';

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  completed: boolean;

  @Field(() => User)
  user: User;
}
