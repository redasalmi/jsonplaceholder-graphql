import { GraphQLError } from 'graphql';

import type { MercuriusContext } from 'mercurius';
import type {
  MutationcreatePhotoArgs,
  MutationdeletePhotoArgs,
  MutationupdatePhotoArgs,
  Photo,
  QueryphotoArgs,
  RequireFields,
} from '~/graphql/generated';

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

export async function photos(
  _: {},
  __: {},
  { prisma }: MercuriusContext,
): Promise<Photo[]> {
  const photos = await prisma.photo.findMany({ include });

  if (!photos) {
    throw new GraphQLError('Photos not found');
  }

  return photos;
}

export async function photo(
  _: {},
  { id }: RequireFields<QueryphotoArgs, 'id'>,
  { prisma }: MercuriusContext,
): Promise<Photo> {
  const photo = await prisma.photo.findUnique({
    where: { id },
    include,
  });

  if (!photo) {
    throw new GraphQLError('Photo not found');
  }

  return photo;
}

export async function createPhoto(
  _: {},
  { photo }: RequireFields<MutationcreatePhotoArgs, 'photo'>,
  { prisma }: MercuriusContext,
): Promise<Photo> {
  return {
    id: (await prisma.photo.count()) + 1,
    ...photo,
    album: {
      id: (await prisma.album.count()) + 1,
      ...photo.album,
      user: {
        id: (await prisma.user.count()) + 1,
        ...photo.album.user,
      },
    },
  };
}

export async function updatePhoto(
  _: {},
  { id, photo }: RequireFields<MutationupdatePhotoArgs, 'id' | 'photo'>,
  { prisma }: MercuriusContext,
) {
  const oldPhoto = await prisma.photo.findUnique({
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

export async function deletePhoto(
  _: {},
  { id }: RequireFields<MutationdeletePhotoArgs, 'id'>,
  { prisma }: MercuriusContext,
) {
  const photo = await prisma.photo.findUnique({
    where: { id },
  });

  if (!photo) {
    throw new GraphQLError('Photo not found');
  }

  return true;
}
