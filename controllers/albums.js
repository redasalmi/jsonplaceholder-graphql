const fetchData = require('../utils/fetch');

const fetchAlbums = async () => {
  const albums = await fetchData('/albums');

  const userIds = [];
  albums.forEach(({ userId }) => {
    if (!userIds.includes(userId)) {
      userIds.push(userId);
    }
  });

  const users = await Promise.all(
    userIds.map(async (id) => fetchData(`/users/${id}`))
  );

  albums.map(
    (album) => (album.user = users.find(({ id }) => id === album.userId))
  );

  return albums;
};

const fetchAlbum = async (id) => {
  const album = await fetchData(`/albums/${id}`);
  const user = await fetchData(`/users/${album.userId}`);
  album.user = user;

  return album;
};

module.exports = { fetchAlbums, fetchAlbum };
