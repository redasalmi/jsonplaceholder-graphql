const {
  fetchAlbums,
  fetchAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} = require('../../controllers/albums');

const albumsResolver = {
  Query: {
    albums: async () => fetchAlbums(),
    album: async (_, { id }) => fetchAlbum(id),
  },
  Mutation: {
    createAlbum: (_, { album }) => createAlbum(album),
    updateAlbum: (_, { id, album }) => updateAlbum(id, album),
    deleteAlbum: (_, { id }) => deleteAlbum(id),
  },
};

module.exports = albumsResolver;
