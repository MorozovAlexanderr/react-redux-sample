import { FC } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import Button from 'src/components/Button';
import CategoriesPicker from 'src/features/categories/components/CategoriesPicker';
import { TodoStatusFilter } from 'src/features/todos/todos.types';
import {
  changeCategoryFilter,
  changeStatusFilter,
} from 'src/features/todos/todosSlice';

const TodoFilters: FC = (): JSX.Element => {
  const statusFilter = useAppSelector((state) => state.todos.filters.status);
  const categoryIdFilter = useAppSelector(
    (state) => state.todos.filters.categoryId
  );

  const dispatch = useAppDispatch();

  return (
    <Container>
      <StatusFilters>
        <FilterButton
          title="All"
          active={statusFilter === TodoStatusFilter.All}
          onClick={() => dispatch(changeStatusFilter(TodoStatusFilter.All))}
        />
        <FilterButton
          title="Completed"
          active={statusFilter === TodoStatusFilter.Completed}
          onClick={() =>
            dispatch(changeStatusFilter(TodoStatusFilter.Completed))
          }
        />
        <FilterButton
          title="Uncompleted"
          active={statusFilter === TodoStatusFilter.Uncompleted}
          onClick={() =>
            dispatch(changeStatusFilter(TodoStatusFilter.Uncompleted))
          }
        />
      </StatusFilters>
      <CategoriesPicker
        selectedCategoryId={categoryIdFilter}
        placeholder="Filter by category"
        onSelect={(option) => dispatch(changeCategoryFilter(option.id))}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 0 35px 0;
  gap: 10px;
`;

const StatusFilters = styled.div`
  width: 400px;
  display: flex;
  border-radius: 5px;

  & button:not(:last-child) {
    border-right: none;
  }

  & button:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  & button:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const FilterButton = styled(Button)<{ active: boolean }>`
  width: 100%;
  background-color: ${(props) => (props.active ? '#007a7e' : '#ffff')};
  color: ${(props) => (props.active ? '#ffff' : '#007a7e')};
  border-radius: unset;
  border: 1px solid #007a7e;
`;

export default TodoFilters;
