import { factory, oneOf, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';

export const db = factory({
  todo: {
    id: primaryKey(() => faker.datatype.uuid()),
    title: () => faker.lorem.words(),
    isCompleted: () => faker.datatype.boolean(),
    category: oneOf('category'),
    createdAt: () => faker.date.recent().toISOString(),
  },
  category: {
    id: primaryKey(() => faker.datatype.uuid()),
    name: () => faker.word.adjective(),
    emoji: () => faker.internet.emoji(),
  },
});

const categories = [];

for (let i = 0; i < 4; i++) {
  categories.push(db.category.create());
}

for (let i = 0; i < 8; i++) {
  db.todo.create({
    category: categories[Math.floor(Math.random() * categories.length)],
  });
}
