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

import { Album } from '~/graphql/schema';
import { UserInput } from '~/graphql/resolvers';
import type { ContextInterface } from '~/types';

const include = {
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
};

@InputType()
export class AlbumInput {
  @Field()
  title: string;

  @Field(() => UserInput)
  user: UserInput;
}

@Resolver()
export class AlbumResolver {
  @Query(() => [Album], { nullable: true })
  async albums(@Ctx() ctx: ContextInterface) {
    return ctx.prisma.album.findMany({ include });
  }

  @Query(() => Album, { nullable: true })
  async album(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    return ctx.prisma.album.findUnique({
      where: { id },
      include,
    });
  }

  @Mutation(() => Album)
  async createAlbum(
    @Arg('album') album: AlbumInput,
    @Ctx() ctx: ContextInterface,
  ) {
    return {
      id: (await ctx.prisma.album.count()) + 1,
      ...album,
    };
  }

  @Mutation(() => Album)
  async updateAlbum(
    @Arg('id') id: number,
    @Arg('album') album: AlbumInput,
    @Ctx() ctx: ContextInterface,
  ) {
    const oldAlbum = await ctx.prisma.album.findUnique({
      where: { id },
      include,
    });

    if (!oldAlbum) {
      throw new GraphQLError('Album not found');
    }

    return {
      ...oldAlbum,
      ...album,
      user: {
        ...oldAlbum.user,
        ...album.user,
        company: {
          ...oldAlbum.user.company,
          ...album.user.company,
        },
        address: {
          ...oldAlbum.user.address,
          ...album.user.address,
          geo: {
            ...oldAlbum.user.address?.geo,
            ...album.user.address?.geo,
          },
        },
      },
    };
  }

  @Mutation(() => Boolean)
  async deleteAlbum(@Arg('id') id: number, @Ctx() ctx: ContextInterface) {
    const album = await ctx.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new GraphQLError('Album not found');
    }

    return true;
  }
}