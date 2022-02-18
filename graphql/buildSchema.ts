import { buildSchema as buildGraphQLSchema } from 'type-graphql';

import {
  AlbumResolver,
  CommentResolver,
  PhotoResolver,
  PostResolver,
  TodoResolver,
  UserResolver,
} from '~/graphql/resolvers';

export default async function buildSchema() {
  const schema = await buildGraphQLSchema({
    resolvers: [
      AlbumResolver,
      CommentResolver,
      PhotoResolver,
      PostResolver,
      TodoResolver,
      UserResolver,
    ],
  });

  return schema;
}
