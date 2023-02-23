import { FC } from 'react';
import CategoriesList from 'src/features/categories/components/CategoriesList';

const CategoriesPage: FC = (): JSX.Element => {
  return (
    <>
      <h1>Categories</h1>
      <CategoriesList />
    </>
  );
};

export default CategoriesPage;
