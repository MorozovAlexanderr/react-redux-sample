import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchTodos, selectTodos } from 'src/features/todos/todosSlice';
import { TodosFetchStatus } from 'src/features/todos/todos.types';
import TodoItem from 'src/features/todos/components/TodoItem';

const TodoList: FC = (): JSX.Element => {
  const fetchStatus = useAppSelector((state) => state.todos.fetchStatus);
  const todos = useAppSelector(selectTodos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (fetchStatus === TodosFetchStatus.Idle) {
      dispatch(fetchTodos());
    }
  }, [dispatch, fetchStatus]);

  if (fetchStatus === TodosFetchStatus.Loading) {
    return <StyledPlaceholder>Loading...</StyledPlaceholder>;
  }

  if (!todos.length) {
    return <StyledPlaceholder>Empty list...</StyledPlaceholder>;
  }

  return (
    <TodoListWrapper>
      <StyledTodoList>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.isCompleted}
            categoryName={todo.category.name}
          />
        ))}
      </StyledTodoList>
    </TodoListWrapper>
  );
};

const TodoListWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const StyledTodoList = styled.ul`
  width: 400px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  min-height: 100%;
  gap: 20px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-thumb {
    border: 5px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 9999px;
    background-color: rgba(224, 224, 224, 0.7);
  }
`;

const StyledPlaceholder = styled.p`
  text-align: center;
  color: #8a8a8a;
`;

export default TodoList;
