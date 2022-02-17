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
  @Field()
  street: string;

  @Field()
  suite: string;

  @Field()
  city: string;

  @Field()
  zipcode: string;

  @Field(() => GeoLocalisation)
  geo: GeoLocalisation;
}

@ObjectType()
class Company {
  @Field()
  name: string;

  @Field()
  catchPhrase: string;

  @Field()
  bs: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => Address)
  address: Address;

  @Field()
  phone: string;

  @Field()
  website: string;

  @Field(() => Company)
  company: Company;
}
