import { gql } from 'mercurius-codegen';

import { AlbumType, AlbumInput } from './album.schema';
import { CommentType, CommentInput } from './comment.schema';
import { PhotoType, PhotoInput } from './photo.schema';
import { PostType, PostInput } from './post.schema';
import { TodoType, TodoInput } from './todo.schema';
import {
  GeoLocalisationType,
  GeoLocalisationInput,
  AddressType,
  AddressInput,
  CompanyType,
  CompanyInput,
  UserType,
  UserInput,
} from './user.schema';

export const typeDefs = gql`
  ${AlbumType}
  ${CommentType}
  ${PhotoType}
  ${PostType}
  ${TodoType}
  ${GeoLocalisationType}
  ${AddressType}
  ${CompanyType}
  ${UserType}
`;

export const inputs = gql`
  ${AlbumInput}
  ${CommentInput}
  ${PhotoInput}
  ${PostInput}
  ${TodoInput}
  ${GeoLocalisationInput}
  ${AddressInput}
  ${CompanyInput}
  ${UserInput}
`;
