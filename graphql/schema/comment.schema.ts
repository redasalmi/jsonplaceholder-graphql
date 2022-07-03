import { gql } from 'mercurius-codegen';

export const CommentType = gql`
  type Comment {
    id: Int!
    name: String!
    email: String!
    body: String!
    post: Post!
  }
`;

export const CommentInput = gql`
  input CommentInput {
    name: String!
    email: String!
    body: String!
    post: PostInput!
  }
`;
