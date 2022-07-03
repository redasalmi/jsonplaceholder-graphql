import type { GraphQLResolveInfo } from "graphql";
import type { MercuriusContext } from "mercurius";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) =>
  | Promise<import("mercurius-codegen").DeepPartial<TResult>>
  | import("mercurius-codegen").DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};

export type Album = {
  __typename?: "Album";
  id: Scalars["Int"];
  title: Scalars["String"];
  user: User;
};

export type Comment = {
  __typename?: "Comment";
  id: Scalars["Int"];
  name: Scalars["String"];
  email: Scalars["String"];
  body: Scalars["String"];
  post: Post;
};

export type Photo = {
  __typename?: "Photo";
  id: Scalars["Int"];
  title?: Maybe<Scalars["String"]>;
  url: Scalars["String"];
  thumbnailUrl?: Maybe<Scalars["String"]>;
  album: Album;
};

export type Post = {
  __typename?: "Post";
  id: Scalars["Int"];
  title: Scalars["String"];
  body: Scalars["String"];
  user: User;
};

export type Todo = {
  __typename?: "Todo";
  id: Scalars["Int"];
  title: Scalars["String"];
  completed: Scalars["Boolean"];
  user: User;
};

export type GeoLocalisation = {
  __typename?: "GeoLocalisation";
  lat: Scalars["String"];
  lng: Scalars["String"];
};

export type Address = {
  __typename?: "Address";
  street?: Maybe<Scalars["String"]>;
  suite?: Maybe<Scalars["String"]>;
  city: Scalars["String"];
  zipcode?: Maybe<Scalars["String"]>;
  geo?: Maybe<GeoLocalisation>;
};

export type Company = {
  __typename?: "Company";
  name: Scalars["String"];
  catchPhrase?: Maybe<Scalars["String"]>;
  bs?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  id: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
  username: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  address?: Maybe<Address>;
  phone?: Maybe<Scalars["String"]>;
  website?: Maybe<Scalars["String"]>;
  company?: Maybe<Company>;
};

export type AlbumInput = {
  title: Scalars["String"];
  user: UserInput;
};

export type CommentInput = {
  name: Scalars["String"];
  email: Scalars["String"];
  body: Scalars["String"];
  post: PostInput;
};

export type PhotoInput = {
  title?: InputMaybe<Scalars["String"]>;
  url: Scalars["String"];
  thumbnailUrl?: InputMaybe<Scalars["String"]>;
  album: AlbumInput;
};

export type PostInput = {
  title: Scalars["String"];
  body: Scalars["String"];
  user: UserInput;
};

export type TodoInput = {
  title: Scalars["String"];
  completed: Scalars["Boolean"];
  user: UserInput;
};

export type GeoLocalisationInput = {
  lat: Scalars["String"];
  lng: Scalars["String"];
};

export type AddressInput = {
  street?: InputMaybe<Scalars["String"]>;
  suite?: InputMaybe<Scalars["String"]>;
  city: Scalars["String"];
  zipcode?: InputMaybe<Scalars["String"]>;
  geo?: InputMaybe<GeoLocalisationInput>;
};

export type CompanyInput = {
  name: Scalars["String"];
  catchPhrase?: InputMaybe<Scalars["String"]>;
  bs?: InputMaybe<Scalars["String"]>;
};

export type UserInput = {
  name?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
  email?: InputMaybe<Scalars["String"]>;
  address?: InputMaybe<AddressInput>;
  phone?: InputMaybe<Scalars["String"]>;
  website?: InputMaybe<Scalars["String"]>;
  company?: InputMaybe<CompanyInput>;
};

export type Query = {
  __typename?: "Query";
  albums: Array<Album>;
  album: Album;
  comments: Array<Comment>;
  comment: Comment;
  photos: Array<Photo>;
  photo: Photo;
  posts: Array<Post>;
  post: Post;
  todos: Array<Todo>;
  todo: Todo;
  users: Array<User>;
  user: User;
};

export type QueryalbumArgs = {
  id: Scalars["Int"];
};

export type QuerycommentArgs = {
  id: Scalars["Int"];
};

export type QueryphotoArgs = {
  id: Scalars["Int"];
};

export type QuerypostArgs = {
  id: Scalars["Int"];
};

export type QuerytodoArgs = {
  id: Scalars["Int"];
};

export type QueryuserArgs = {
  id: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  createAlbum: Album;
  updateAlbum: Album;
  deleteAlbum?: Maybe<Scalars["Boolean"]>;
  createComment: Comment;
  updateComment: Comment;
  deleteComment?: Maybe<Scalars["Boolean"]>;
  createPhoto: Photo;
  updatePhoto: Photo;
  deletePhoto?: Maybe<Scalars["Boolean"]>;
  createPost: Post;
  updatePost: Post;
  deletePost?: Maybe<Scalars["Boolean"]>;
  createTodo: Todo;
  updateTodo: Todo;
  deleteTodo?: Maybe<Scalars["Boolean"]>;
  createUser: User;
  updateUser: User;
  deleteUser?: Maybe<Scalars["Boolean"]>;
};

export type MutationcreateAlbumArgs = {
  album: AlbumInput;
};

export type MutationupdateAlbumArgs = {
  id: Scalars["Int"];
  album: AlbumInput;
};

export type MutationdeleteAlbumArgs = {
  id: Scalars["Int"];
};

export type MutationcreateCommentArgs = {
  comment: CommentInput;
};

export type MutationupdateCommentArgs = {
  id: Scalars["Int"];
  comment: CommentInput;
};

export type MutationdeleteCommentArgs = {
  id: Scalars["Int"];
};

export type MutationcreatePhotoArgs = {
  photo: PhotoInput;
};

export type MutationupdatePhotoArgs = {
  id: Scalars["Int"];
  photo: PhotoInput;
};

export type MutationdeletePhotoArgs = {
  id: Scalars["Int"];
};

export type MutationcreatePostArgs = {
  post: PostInput;
};

export type MutationupdatePostArgs = {
  id: Scalars["Int"];
  post: PostInput;
};

export type MutationdeletePostArgs = {
  id: Scalars["Int"];
};

export type MutationcreateTodoArgs = {
  todo: TodoInput;
};

export type MutationupdateTodoArgs = {
  id: Scalars["Int"];
  todo: TodoInput;
};

export type MutationdeleteTodoArgs = {
  id: Scalars["Int"];
};

export type MutationcreateUserArgs = {
  user: UserInput;
};

export type MutationupdateUserArgs = {
  id: Scalars["Int"];
  user: UserInput;
};

export type MutationdeleteUserArgs = {
  id: Scalars["Int"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Album: ResolverTypeWrapper<Album>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Comment: ResolverTypeWrapper<Comment>;
  Photo: ResolverTypeWrapper<Photo>;
  Post: ResolverTypeWrapper<Post>;
  Todo: ResolverTypeWrapper<Todo>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  GeoLocalisation: ResolverTypeWrapper<GeoLocalisation>;
  Address: ResolverTypeWrapper<Address>;
  Company: ResolverTypeWrapper<Company>;
  User: ResolverTypeWrapper<User>;
  AlbumInput: AlbumInput;
  CommentInput: CommentInput;
  PhotoInput: PhotoInput;
  PostInput: PostInput;
  TodoInput: TodoInput;
  GeoLocalisationInput: GeoLocalisationInput;
  AddressInput: AddressInput;
  CompanyInput: CompanyInput;
  UserInput: UserInput;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Album: Album;
  Int: Scalars["Int"];
  String: Scalars["String"];
  Comment: Comment;
  Photo: Photo;
  Post: Post;
  Todo: Todo;
  Boolean: Scalars["Boolean"];
  GeoLocalisation: GeoLocalisation;
  Address: Address;
  Company: Company;
  User: User;
  AlbumInput: AlbumInput;
  CommentInput: CommentInput;
  PhotoInput: PhotoInput;
  PostInput: PostInput;
  TodoInput: TodoInput;
  GeoLocalisationInput: GeoLocalisationInput;
  AddressInput: AddressInput;
  CompanyInput: CompanyInput;
  UserInput: UserInput;
  Query: {};
  Mutation: {};
};

export type AlbumResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Album"] = ResolversParentTypes["Album"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  body?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  post?: Resolver<ResolversTypes["Post"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PhotoResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Photo"] = ResolversParentTypes["Photo"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  thumbnailUrl?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  album?: Resolver<ResolversTypes["Album"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Post"] = ResolversParentTypes["Post"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  body?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Todo"] = ResolversParentTypes["Todo"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoLocalisationResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["GeoLocalisation"] = ResolversParentTypes["GeoLocalisation"]
> = {
  lat?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Address"] = ResolversParentTypes["Address"]
> = {
  street?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  suite?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  zipcode?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  geo?: Resolver<
    Maybe<ResolversTypes["GeoLocalisation"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Company"] = ResolversParentTypes["Company"]
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  catchPhrase?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  bs?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes["Address"]>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes["Company"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  albums?: Resolver<Array<ResolversTypes["Album"]>, ParentType, ContextType>;
  album?: Resolver<
    ResolversTypes["Album"],
    ParentType,
    ContextType,
    RequireFields<QueryalbumArgs, "id">
  >;
  comments?: Resolver<
    Array<ResolversTypes["Comment"]>,
    ParentType,
    ContextType
  >;
  comment?: Resolver<
    ResolversTypes["Comment"],
    ParentType,
    ContextType,
    RequireFields<QuerycommentArgs, "id">
  >;
  photos?: Resolver<Array<ResolversTypes["Photo"]>, ParentType, ContextType>;
  photo?: Resolver<
    ResolversTypes["Photo"],
    ParentType,
    ContextType,
    RequireFields<QueryphotoArgs, "id">
  >;
  posts?: Resolver<Array<ResolversTypes["Post"]>, ParentType, ContextType>;
  post?: Resolver<
    ResolversTypes["Post"],
    ParentType,
    ContextType,
    RequireFields<QuerypostArgs, "id">
  >;
  todos?: Resolver<Array<ResolversTypes["Todo"]>, ParentType, ContextType>;
  todo?: Resolver<
    ResolversTypes["Todo"],
    ParentType,
    ContextType,
    RequireFields<QuerytodoArgs, "id">
  >;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  user?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<QueryuserArgs, "id">
  >;
};

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createAlbum?: Resolver<
    ResolversTypes["Album"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateAlbumArgs, "album">
  >;
  updateAlbum?: Resolver<
    ResolversTypes["Album"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateAlbumArgs, "id" | "album">
  >;
  deleteAlbum?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationdeleteAlbumArgs, "id">
  >;
  createComment?: Resolver<
    ResolversTypes["Comment"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateCommentArgs, "comment">
  >;
  updateComment?: Resolver<
    ResolversTypes["Comment"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateCommentArgs, "id" | "comment">
  >;
  deleteComment?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationdeleteCommentArgs, "id">
  >;
  createPhoto?: Resolver<
    ResolversTypes["Photo"],
    ParentType,
    ContextType,
    RequireFields<MutationcreatePhotoArgs, "photo">
  >;
  updatePhoto?: Resolver<
    ResolversTypes["Photo"],
    ParentType,
    ContextType,
    RequireFields<MutationupdatePhotoArgs, "id" | "photo">
  >;
  deletePhoto?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationdeletePhotoArgs, "id">
  >;
  createPost?: Resolver<
    ResolversTypes["Post"],
    ParentType,
    ContextType,
    RequireFields<MutationcreatePostArgs, "post">
  >;
  updatePost?: Resolver<
    ResolversTypes["Post"],
    ParentType,
    ContextType,
    RequireFields<MutationupdatePostArgs, "id" | "post">
  >;
  deletePost?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationdeletePostArgs, "id">
  >;
  createTodo?: Resolver<
    ResolversTypes["Todo"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateTodoArgs, "todo">
  >;
  updateTodo?: Resolver<
    ResolversTypes["Todo"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateTodoArgs, "id" | "todo">
  >;
  deleteTodo?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationdeleteTodoArgs, "id">
  >;
  createUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateUserArgs, "user">
  >;
  updateUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateUserArgs, "id" | "user">
  >;
  deleteUser?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationdeleteUserArgs, "id">
  >;
};

export type Resolvers<ContextType = MercuriusContext> = {
  Album?: AlbumResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Photo?: PhotoResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  GeoLocalisation?: GeoLocalisationResolvers<ContextType>;
  Address?: AddressResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};

export type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj;
    params: TParams;
  }>,
  context: TContext & {
    reply: import("fastify").FastifyReply;
  }
) => Promise<Array<import("mercurius-codegen").DeepPartial<TReturn>>>;
export type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>;
      opts?: {
        cache?: boolean;
      };
    };
export interface Loaders<
  TContext = import("mercurius").MercuriusContext & {
    reply: import("fastify").FastifyReply;
  }
> {
  Album?: {
    id?: LoaderResolver<Scalars["Int"], Album, {}, TContext>;
    title?: LoaderResolver<Scalars["String"], Album, {}, TContext>;
    user?: LoaderResolver<User, Album, {}, TContext>;
  };

  Comment?: {
    id?: LoaderResolver<Scalars["Int"], Comment, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], Comment, {}, TContext>;
    email?: LoaderResolver<Scalars["String"], Comment, {}, TContext>;
    body?: LoaderResolver<Scalars["String"], Comment, {}, TContext>;
    post?: LoaderResolver<Post, Comment, {}, TContext>;
  };

  Photo?: {
    id?: LoaderResolver<Scalars["Int"], Photo, {}, TContext>;
    title?: LoaderResolver<Maybe<Scalars["String"]>, Photo, {}, TContext>;
    url?: LoaderResolver<Scalars["String"], Photo, {}, TContext>;
    thumbnailUrl?: LoaderResolver<
      Maybe<Scalars["String"]>,
      Photo,
      {},
      TContext
    >;
    album?: LoaderResolver<Album, Photo, {}, TContext>;
  };

  Post?: {
    id?: LoaderResolver<Scalars["Int"], Post, {}, TContext>;
    title?: LoaderResolver<Scalars["String"], Post, {}, TContext>;
    body?: LoaderResolver<Scalars["String"], Post, {}, TContext>;
    user?: LoaderResolver<User, Post, {}, TContext>;
  };

  Todo?: {
    id?: LoaderResolver<Scalars["Int"], Todo, {}, TContext>;
    title?: LoaderResolver<Scalars["String"], Todo, {}, TContext>;
    completed?: LoaderResolver<Scalars["Boolean"], Todo, {}, TContext>;
    user?: LoaderResolver<User, Todo, {}, TContext>;
  };

  GeoLocalisation?: {
    lat?: LoaderResolver<Scalars["String"], GeoLocalisation, {}, TContext>;
    lng?: LoaderResolver<Scalars["String"], GeoLocalisation, {}, TContext>;
  };

  Address?: {
    street?: LoaderResolver<Maybe<Scalars["String"]>, Address, {}, TContext>;
    suite?: LoaderResolver<Maybe<Scalars["String"]>, Address, {}, TContext>;
    city?: LoaderResolver<Scalars["String"], Address, {}, TContext>;
    zipcode?: LoaderResolver<Maybe<Scalars["String"]>, Address, {}, TContext>;
    geo?: LoaderResolver<Maybe<GeoLocalisation>, Address, {}, TContext>;
  };

  Company?: {
    name?: LoaderResolver<Scalars["String"], Company, {}, TContext>;
    catchPhrase?: LoaderResolver<
      Maybe<Scalars["String"]>,
      Company,
      {},
      TContext
    >;
    bs?: LoaderResolver<Maybe<Scalars["String"]>, Company, {}, TContext>;
  };

  User?: {
    id?: LoaderResolver<Scalars["Int"], User, {}, TContext>;
    name?: LoaderResolver<Maybe<Scalars["String"]>, User, {}, TContext>;
    username?: LoaderResolver<Scalars["String"], User, {}, TContext>;
    email?: LoaderResolver<Maybe<Scalars["String"]>, User, {}, TContext>;
    address?: LoaderResolver<Maybe<Address>, User, {}, TContext>;
    phone?: LoaderResolver<Maybe<Scalars["String"]>, User, {}, TContext>;
    website?: LoaderResolver<Maybe<Scalars["String"]>, User, {}, TContext>;
    company?: LoaderResolver<Maybe<Company>, User, {}, TContext>;
  };
}
declare module "mercurius" {
  interface IResolvers
    extends Resolvers<import("mercurius").MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
