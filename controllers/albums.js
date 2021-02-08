const { fetchData, fetchById } = require('../utils/fetch');
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
  const user = fetchUser(album.userId);
  album.user = user;

  return album;
};

module.exports = { fetchAlbums, fetchAlbum };
