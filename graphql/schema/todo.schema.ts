import { gql } from 'mercurius-codegen';

export const TodoType = gql`
  type Todo {
    id: Int!
    title: String!
    completed: Boolean!
    user: User!
  }
`;

export const TodoInput = gql`
  input TodoInput {
    title: String!
    completed: Boolean!
    user: UserInput!
  }
`;
