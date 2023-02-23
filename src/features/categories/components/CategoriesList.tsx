import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  fetchCategories,
  selectCategories,
} from 'src/features/categories/categoriesSlice';
import { CategoryFetchStatus } from 'src/features/categories/categories.types';
import CategoryItem from 'src/features/categories/components/CategoryItem';

const CategoriesList: FC = (): JSX.Element => {
  const fetchStatus = useAppSelector((state) => state.categories.fetchStatus);
  const categories = useAppSelector(selectCategories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (fetchStatus === CategoryFetchStatus.Idle) {
      dispatch(fetchCategories());
    }
  }, [dispatch, fetchStatus]);

  return (
    <StyledCategoriesList>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          id={category.id}
          name={category.name}
          emoji={category.emoji}
        />
      ))}
    </StyledCategoriesList>
  );
};

const StyledCategoriesList = styled.ul`
  margin-top: 25px;
`;

export default CategoriesList;
