import React, { FC, useEffect } from 'react';
import Dropdown, { Option } from 'src/components/Dropdown';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  fetchCategories,
  selectCategories,
} from 'src/features/categories/categoriesSlice';
import { CategoryFetchStatus } from 'src/features/categories/categories.types';

interface Props {
  selectedCategoryId: string | null;
  error?: boolean;
  placeholder: string;
  onSelect: (categoryOption: Option) => void;
}

const CategoriesPicker: FC<Props> = ({
  selectedCategoryId,
  error,
  placeholder,
  onSelect,
}): JSX.Element => {
  const fetchStatus = useAppSelector((state) => state.categories.fetchStatus);
  const categories = useAppSelector(selectCategories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (fetchStatus === CategoryFetchStatus.Idle) {
      dispatch(fetchCategories());
    }
  }, [fetchStatus, dispatch]);

  return (
    <Dropdown
      selectedOptionId={selectedCategoryId}
      options={categories}
      emptyListPlaceholder={
        fetchStatus === CategoryFetchStatus.Loading
          ? 'Loading...'
          : 'No categories found'
      }
      error={error}
      defaultPlaceholder={placeholder}
      onSelect={onSelect}
    />
  );
};

export default CategoriesPicker;
