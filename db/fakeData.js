const faker = require('faker');

const range = (start, stop) =>
  Array.from({ length: stop }, (_, i) => start + i);

const shouldIncrement = (index, divisedBy) => index % divisedBy === 1;

let userId = 0;
const posts = range(1, 100).map((index) => {
  if (shouldIncrement(index, 10)) {
    userId += 1;
  }

  const post = {
    userId,
    id: index,
    title: faker.lorem.words(10),
    body: faker.lorem.paragraphs(2),
  };

  return post;
});

let postId = 0;
const comments = range(1, 500).map((index) => {
  if (shouldIncrement(index, 10)) {
    postId += 1;
  }

  const comment = {
    postId,
    id: index,
    name: faker.lorem.words(10),
    email: faker.internet.email(),
    body: faker.lorem.paragraphs(2),
  };

  return comment;
});

userId = 0;
const albums = range(1, 100).map((index) => {
  if (shouldIncrement(index, 10)) {
    userId += 1;
  }

  const album = {
    userId,
    id: index,
    title: faker.lorem.words(10),
  };

  return album;
});

let albumId = 0;
const photos = range(1, 5000).map((index) => {
  if (shouldIncrement(index, 50)) {
    albumId += 1;
  }

  const imageUrl = faker.image.animals(640, 480);
  const thumbnail = imageUrl.replace('640', '160').replace('480', '160');
  const photo = {
    albumId,
    id: index,
    title: faker.lorem.words(10),
    url: imageUrl,
    thumbnailUrl: thumbnail,
  };

  return photo;
});

userId = 0;
const todos = range(1, 200).map((index) => {
  if (shouldIncrement(index, 20)) {
    userId += 1;
  }

  const todo = {
    userId,
    id: index,
    title: faker.lorem.words(10),
    completed: faker.random.boolean(),
  };

  return todo;
});

const users = range(1, 10).map((index) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  const user = {
    id: index,
    name: `${firstName} ${lastName}`,
    username: faker.internet.userName(firstName, lastName),
    email: faker.internet.email(firstName, lastName),
    address: {
      street: faker.address.streetName(),
      suite: faker.address.streetAddress(),
      city: faker.address.city(),
      zipcode: faker.address.zipCode(),
      geo: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
      },
    },
    phone: faker.phone.phoneNumber(),
    website: faker.internet.domainName(),
    company: {
      name: faker.company.companyName(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.bs(),
    },
  };

  return user;
});

const fakeData = {
  posts,
  comments,
  albums,
  photos,
  todos,
  users,
};

module.exports = fakeData;
