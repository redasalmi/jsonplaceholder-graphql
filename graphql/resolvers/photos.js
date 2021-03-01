const {
  fetchPhotos,
  fetchPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
} = require('../../controllers/photos');

const photosResolver = {
  Query: {
    photos: async () => fetchPhotos(),
    photo: async (_, { id }) => fetchPhoto(id),
  },
  Mutation: {
    createPhoto: (_, { photo }) => createPhoto(photo),
    updatePhoto: (_, { id, photo }) => updatePhoto(id, photo),
    deletePhoto: (_, { id }) => deletePhoto(id),
  },
};

module.exports = photosResolver;
