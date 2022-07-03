import { gql } from 'mercurius-codegen';

export const PhotoType = gql`
  type Photo {
    id: Int!
    title: String
    url: String!
    thumbnailUrl: String
    album: Album!
  }
`;

export const PhotoInput = gql`
  input PhotoInput {
    title: String
    url: String!
    thumbnailUrl: String
    album: AlbumInput!
  }
`;
