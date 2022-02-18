import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
class GeoLocalisation {
  @Field()
  lat: String;

  @Field()
  lng: String;
}

@ObjectType()
class Address {
  @Field({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  suite?: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  zipcode?: string;

  @Field({ nullable: true })
  geo?: GeoLocalisation;
}

@ObjectType()
class Company {
  @Field()
  name: string;

  @Field({ nullable: true })
  catchPhrase?: string;

  @Field({ nullable: true })
  bs?: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  address?: Address;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  company?: Company;
}
