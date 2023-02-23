import { FC } from 'react';
import AddTodo2 from 'src/features/todos/components/AddTodo2';

const TodoCreationPage: FC = (): JSX.Element => {
  return (
    <>
      <h1>Create todo</h1>
      <AddTodo2 />
    </>
  );
};

export default TodoCreationPage;
