import { gql } from 'mercurius-codegen';

export const AlbumType = gql`
  type Album {
    id: Int!
    title: String!
    user: User!
  }
`;

export const AlbumInput = gql`
  input AlbumInput {
    title: String!
    user: UserInput!
  }
`;
