const fetchData = require('../utils/fetch');
const { fetchAlbum } = require('./albums');

const fetchPhotos = async () => {
  const photos = await fetchData('/photos');

  const albumIds = [];
  photos.forEach(({ albumId }) => {
    if (!albumIds.includes(albumId)) {
      albumIds.push(albumId);
    }
  });

  const albums = await Promise.all(albumIds.map(async (id) => fetchAlbum(id)));

  photos.map(
    (photo) => (photo.album = albums.find(({ id }) => id === photo.albumId))
  );

  return photos;
};

const fetchPhoto = async (id) => {
  const photo = await fetchData(`/photos/${id}`);
  const album = await fetchAlbum(photo.albumId);
  photo.album = album;

  return photo;
};

module.exports = { fetchPhotos, fetchPhoto };
