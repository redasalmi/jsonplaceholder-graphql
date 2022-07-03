import { gql } from 'mercurius-codegen';

export const PostType = gql`
  type Post {
    id: Int!
    title: String!
    body: String!
    user: User!
  }
`;

export const PostInput = gql`
  input PostInput {
    title: String!
    body: String!
    user: UserInput!
  }
`;
