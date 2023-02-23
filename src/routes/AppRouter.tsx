import { FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import TodoListPage from '../pages/TodoListPage';
import CategoriesPage from '../pages/CategoriesPage';
import Layout from 'src/components/Layout';
import TodoCreationPage from 'src/pages/TodoCreationPage';

const AppRouter: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate replace to="todos" />} />
        <Route path="todos/create" element={<TodoCreationPage />} />
        <Route path="todos" element={<TodoListPage />} />
        <Route path="categories" element={<CategoriesPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
