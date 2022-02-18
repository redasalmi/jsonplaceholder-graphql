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

import { Photo } from '~/graphql-ts/schema';
import { AlbumInput } from '~/graphql-ts/resolvers';
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
  @Field({ nullable: true })
  title?: string;

  @Field()
  url: string;

  @Field({ nullable: true })
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

  @Query(() => Photo, { nullable: true })
  async photo(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    return ctx.prisma.photo.findUnique({
      where: { id },
      include,
    });
  }

  @Mutation(() => Photo)
  async createPhoto(
    @Arg('photo') photo: PhotoInput,
    @Ctx() ctx: ContextInterface,
  ) {
    return {
      id: (await ctx.prisma.photo.count()) + 1,
      ...photo,
    };
  }

  @Mutation(() => Photo)
  async updatePhoto(
    @Arg('id') id: number,
    @Arg('photo') photo: PhotoInput,
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
  async deletePhoto(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    const photo = await ctx.prisma.photo.findUnique({
      where: { id },
    });

    if (!photo) {
      throw new GraphQLError('Photo not found');
    }

    return true;
  }
}
