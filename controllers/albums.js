const fetchData = require('../utils/fetch');
const { fetchUser } = require('./users');

const fetchAlbums = async () => {
  const albums = await fetchData('/albums');

  const userIds = [];
  albums.forEach(({ userId }) => {
    if (!userIds.includes(userId)) {
      userIds.push(userId);
    }
  });

  const users = await Promise.all(userIds.map(async (id) => fetchUser(id)));
  albums.map(
    (album) => (album.user = users.find(({ id }) => id === album.userId))
  );

  return albums;
};

const fetchAlbum = async (id) => {
  const album = await fetchData(`/albums/${id}`);
  const user = await fetchUser(album.userId);
  album.user = user;

  return album;
};

module.exports = { fetchAlbums, fetchAlbum };
