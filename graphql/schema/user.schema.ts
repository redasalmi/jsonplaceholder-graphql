import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
class GeoLocalisation {
  @Field(() => String)
  lat: String;

  @Field(() => String)
  lng: String;
}

@ObjectType()
class Address {
  @Field(() => String, { nullable: true })
  street?: string;

  @Field(() => String, { nullable: true })
  suite?: string;

  @Field(() => String)
  city: string;

  @Field(() => String, { nullable: true })
  zipcode?: string;

  @Field(() => GeoLocalisation, { nullable: true })
  geo?: GeoLocalisation;
}

@ObjectType()
class Company {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  catchPhrase?: string;

  @Field(() => String, { nullable: true })
  bs?: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String)
  username: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Address, { nullable: true })
  address?: Address;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  website?: string;

  @Field(() => Company, { nullable: true })
  company?: Company;
}
