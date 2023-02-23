import { rest } from 'msw';
import { db } from './db';
import { res } from './res';

interface CreateTodoBody {
  title: string;
  categoryId: string;
}

export const handlers = [
  rest.get('/todos', (req, _, ctx) => {
    try {
      return res(ctx.json(db.todo.getAll()));
    } catch (error: any) {
      return res(
        ctx.status(400),
        ctx.json({ msg: 'Some error occurred', err: error })
      );
    }
  }),

  rest.post<CreateTodoBody>('/todos', async (req, _, ctx) => {
    try {
      const data = await req.json();

      const category = db.category.findFirst({
        where: { id: { equals: data.categoryId } },
      });

      if (!category) {
        return res(ctx.status(400), ctx.json({ msg: 'Category not found' }));
      }

      return res(
        ctx.status(201),
        ctx.json(
          db.todo.create({
            title: data.title,
            isCompleted: false,
            category,
            createdAt: new Date().toISOString(),
          })
        )
      );
    } catch (error: any) {
      return res(ctx.status(400), ctx.json({ msg: 'Some error occurred' }));
    }
  }),

  rest.get('/categories', (req, _, ctx) => {
    try {
      return res(ctx.json(db.category.getAll()));
    } catch (error: any) {
      return res(ctx.status(400), ctx.json({ msg: 'Some error occurred' }));
    }
  }),
];
