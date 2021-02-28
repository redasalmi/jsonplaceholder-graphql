const { GraphQLError } = require('graphql');

const { fetchData, fetchById, getPropertyLength } = require('../utils/fetch');
const { fetchAlbum } = require('./albums');

const fetchPhotos = () => {
  const photos = fetchData('photos');

  const albumIds = [];
  photos.forEach(({ albumId }) => {
    if (!albumIds.includes(albumId)) {
      albumIds.push(albumId);
    }
  });

  const albums = albumIds.map((id) => fetchAlbum(id));
  photos.map(
    (photo) => (photo.album = albums.find(({ id }) => id === photo.albumId))
  );

  return photos;
};

const fetchPhoto = (id) => {
  const photo = fetchById('photos', id);

  if (photo === undefined) {
    throw new GraphQLError('Photo not found');
  }

  const album = fetchAlbum(photo.albumId);
  photo.album = album;

  return photo;
};

const createPhoto = (photoParam) => {
  const photoId = getPropertyLength('photos') + 1;
  const albumId = getPropertyLength('albums') + 1;
  const userId = getPropertyLength('users') + 1;

  const newPhoto = {
    id: photoId,
    ...photoParam,

    album: {
      id: albumId,
      ...photoParam.album,

      user: {
        id: userId,
        ...photoParam.album.user,
      },
    },
  };

  return newPhoto;
};

const updatePhoto = (id, photoParam) => {
  const photo = fetchPhoto(id);

  const updatedPhoto = {
    ...photo,
    ...photoParam,

    album: {
      ...photo.album,
      ...photoParam.album,

      user: {
        ...photo.album.user,
        ...photoParam.album.user,
      },
    },
  };

  return updatedPhoto;
};

const deletePhoto = (id) => {
  fetchPhoto(id);

  return true;
};

module.exports = {
  fetchPhotos,
  fetchPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
};
