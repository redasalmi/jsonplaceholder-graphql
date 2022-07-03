import { GraphQLError } from 'graphql';

import type { MercuriusContext } from 'mercurius';
import type {
  Album,
  RequireFields,
  QueryalbumArgs,
  MutationcreateAlbumArgs,
  MutationupdateAlbumArgs,
  MutationdeleteAlbumArgs,
} from '~/graphql/generated';

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

export async function albums(
  _: {},
  __: {},
  { prisma }: MercuriusContext,
): Promise<Album[]> {
  const albums = await prisma.album.findMany({ include });

  if (!albums) {
    throw new GraphQLError('Albums not found');
  }

  return albums;
}

export async function album(
  _: {},
  { id }: RequireFields<QueryalbumArgs, 'id'>,
  { prisma }: MercuriusContext,
): Promise<Album> {
  const album = await prisma.album.findUnique({
    where: { id },
    include,
  });

  if (!album) {
    throw new GraphQLError('Album not found');
  }

  return album;
}

export async function createAlbum(
  _: {},
  { album }: RequireFields<MutationcreateAlbumArgs, 'album'>,
  { prisma }: MercuriusContext,
): Promise<Album> {
  return {
    id: (await prisma.album.count()) + 1,
    ...album,
    user: {
      id: (await prisma.user.count()) + 1,
      ...album.user,
    },
  };
}

export async function updateAlbum(
  _: {},
  { id, album }: RequireFields<MutationupdateAlbumArgs, 'id' | 'album'>,
  { prisma }: MercuriusContext,
) {
  const oldAlbum = await prisma.album.findUnique({
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

export async function deleteAlbum(
  _: {},
  { id }: RequireFields<MutationdeleteAlbumArgs, 'id'>,
  { prisma }: MercuriusContext,
) {
  const album = await prisma.album.findUnique({
    where: { id },
  });

  if (!album) {
    throw new GraphQLError('Album not found');
  }

  return true;
}
