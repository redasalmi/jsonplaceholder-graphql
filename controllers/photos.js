const { fetchData, fetchById } = require('../utils/fetch');
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
  const album = fetchAlbum(photo.albumId);
  photo.album = album;

  return photo;
};

module.exports = { fetchPhotos, fetchPhoto };
