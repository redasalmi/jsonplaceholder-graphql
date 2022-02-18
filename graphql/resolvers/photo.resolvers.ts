import { GraphQLError } from 'graphql';
import {
  Resolver,
  Query,
  Arg,
  Ctx,
  Mutation,
  InputType,
  Field,
} from 'type-graphql';

import { Photo } from '~/graphql/schema';
import { AlbumInput } from '~/graphql/resolvers';
import type { ContextInterface } from '~/types';

const include = {
  album: {
    include: {
      user: {
        include: {
          company: true,
          address: {
            include: {
              geo: true,
            },
          },
        },
      },
    },
  },
};

@InputType()
class PhotoInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String)
  url: string;

  @Field(() => String, { nullable: true })
  thumbnailUrl?: string;

  @Field(() => AlbumInput)
  album: AlbumInput;
}

@Resolver()
export class PhotoResolver {
  @Query(() => [Photo], { nullable: true })
  async photos(@Ctx() ctx: ContextInterface) {
    return ctx.prisma.photo.findMany({
      include,
    });
  }

  @Query(() => Photo)
  async photo(
    @Arg('id', () => Number) id: number,
    @Ctx() ctx: ContextInterface,
  ) {
    const photo = await ctx.prisma.photo.findUnique({
      where: { id },
      include,
    });

    if (!photo) {
      throw new GraphQLError('Photo not found');
    }

    return photo;
  }

  @Mutation(() => Photo)
  async createPhoto(
    @Arg('photo', () => PhotoInput) photo: PhotoInput,
    @Ctx() ctx: ContextInterface,
  ) {
    return {
      id: (await ctx.prisma.photo.count()) + 1,
      ...photo,
    };
  }

  @Mutation(() => Photo)
  async updatePhoto(
    @Arg('id', () => Number) id: number,
    @Arg('photo', () => PhotoInput) photo: PhotoInput,
    @Ctx() ctx: ContextInterface,
  ) {
    const oldPhoto = await ctx.prisma.photo.findUnique({
      where: { id },
      include,
    });

    if (!oldPhoto) {
      throw new GraphQLError('Photo not found');
    }

    return {
      ...oldPhoto,
      ...photo,
      album: {
        ...oldPhoto.album,
        ...photo.album,
        user: {
          ...oldPhoto.album.user,
          ...photo.album.user,
          company: {
            ...oldPhoto.album.user.company,
            ...photo.album.user.company,
          },
          address: {
            ...oldPhoto.album.user.address,
            ...photo.album.user.address,
            geo: {
              ...oldPhoto.album.user.address?.geo,
              ...photo.album.user.address?.geo,
            },
          },
        },
      },
    };
  }

  @Mutation(() => Boolean)
  async deletePhoto(
    @Arg('id', () => Number) id: number,
    @Ctx() ctx: ContextInterface,
  ) {
    const photo = await ctx.prisma.photo.findUnique({
      where: { id },
    });

    if (!photo) {
      throw new GraphQLError('Photo not found');
    }

    return true;
  }
}
