import { gql } from 'mercurius-codegen';

export const GeoLocalisationType = gql`
  type GeoLocalisation {
    lat: String!
    lng: String!
  }
`;

export const AddressType = gql`
  type Address {
    street: String
    suite: String
    city: String!
    zipcode: String
    geo: GeoLocalisation
  }
`;

export const CompanyType = gql`
  type Company {
    name: String!
    catchPhrase: String
    bs: String
  }
`;

export const UserType = gql`
  type User {
    id: Int!
    name: String
    username: String!
    email: String
    address: Address
    phone: String
    website: String
    company: Company
  }
`;

export const GeoLocalisationInput = gql`
  input GeoLocalisationInput {
    lat: String!
    lng: String!
  }
`;

export const AddressInput = gql`
  input AddressInput {
    street: String
    suite: String
    city: String!
    zipcode: String
    geo: GeoLocalisationInput
  }
`;

export const CompanyInput = gql`
  input CompanyInput {
    name: String!
    catchPhrase: String
    bs: String
  }
`;

export const UserInput = gql`
  input UserInput {
    name: String
    username: String!
    email: String
    address: AddressInput
    phone: String
    website: String
    company: CompanyInput
  }
`;
