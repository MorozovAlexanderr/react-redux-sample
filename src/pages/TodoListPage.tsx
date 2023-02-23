import { FC } from 'react';
import AddTodo1 from 'src/features/todos/components/AddTodo1';
import TodoFilters from 'src/features/todos/components/TodoFilters';
import TodoList from 'src/features/todos/components/TodoList';

const TodoListPage: FC = (): JSX.Element => {
  return (
    <>
      <h1>Todo List</h1>
      <TodoFilters />
      <TodoList />
    </>
  );
};

export default TodoListPage;
