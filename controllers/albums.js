const { GraphQLError } = require('graphql');

const { fetchData, fetchById, getPropertyLength } = require('../utils/fetch');
const { fetchUser } = require('./users');

const fetchAlbums = () => {
  const albums = fetchData('albums');

  const userIds = [];
  albums.forEach(({ userId }) => {
    if (!userIds.includes(userId)) {
      userIds.push(userId);
    }
  });

  const users = userIds.map((id) => fetchUser(id));
  albums.map(
    (album) => (album.user = users.find(({ id }) => id === album.userId))
  );

  return albums;
};

const fetchAlbum = (id) => {
  const album = fetchById('albums', id);

  if (album === undefined) {
    throw new GraphQLError('Album not found');
  }

  const user = fetchUser(album.userId);
  album.user = user;

  return album;
};

const createAlbum = (albumParam) => {
  const { title, user } = albumParam;
  const albumId = getPropertyLength('albums') + 1;
  const userId = getPropertyLength('users') + 1;

  const newAlbum = {
    id: albumId,
    title,
    user: {
      id: userId,
      ...user,
    },
  };

  return newAlbum;
};

const updateAlbum = (id, albumParam) => {
  const { title, user } = albumParam;
  const album = fetchAlbum(id);

  const updatedAlbum = {
    ...album,
    title,
    user: {
      ...album.user,
      ...user,
    },
  };

  return updatedAlbum;
};

const deleteAlbum = (id) => {
  fetchAlbum(id);

  return true;
};

module.exports = {
  fetchAlbums,
  fetchAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
