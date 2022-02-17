import { PrismaClient } from '@prisma/client';

import { users, posts, albums, comments, photos, todos } from '~/prisma/data';

async function createData<T>(arr: T[], callback: (item: T) => void) {
  const start = 0;
  const end = 100;
  const temp = [];

  while (arr.length) {
    const chunk = arr.splice(start, end);
    temp.push(chunk);
  }

  for await (const items of temp) {
    await Promise.all(items.map((item) => callback(item)));
  }
}

async function seed() {
  const db = new PrismaClient();

  await createData(users, async (user) => db.user.create({ data: user }));
  await createData(posts, async (post) => db.post.create({ data: post }));
  await createData(
    albums,
    async (album) => await db.album.create({ data: album }),
  );
  await createData(
    comments,
    async (comment) => await db.comment.create({ data: comment }),
  );
  await createData(
    photos,
    async (photo) => await db.photo.create({ data: photo }),
  );
  await createData(todos, async (todo) => await db.todo.create({ data: todo }));
}

seed();
