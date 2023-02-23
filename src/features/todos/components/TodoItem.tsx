import { FC, memo } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from 'src/app/hooks';
import { SpacedFlexContainer } from 'src/assets/styles/Common';
import CheckBox from 'src/components/CheckBox';
import { removeTodo, updateTodoStatus } from 'src/features/todos/todosSlice';

interface Props {
  id: string;
  title: string;
  completed: boolean;
  categoryName: string;
}

const TodoItem: FC<Props> = ({
  id,
  title,
  completed = true,
  categoryName,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <StyledTodoItem>
      <SpacedFlexContainer>
        <StyledLabel crossed={completed}>
          <CheckBox
            checked={completed}
            onChange={(status) => dispatch(updateTodoStatus({ id, status }))}
          />
          {title}
        </StyledLabel>
        <StyledRemoveBtn
          src={window.location.origin + '/images/bin.svg'}
          alt="delete"
          width={20}
          onClick={() => dispatch(removeTodo(id))}
        />
      </SpacedFlexContainer>
      <StyledCategoryName>{categoryName}</StyledCategoryName>
    </StyledTodoItem>
  );
};

const StyledTodoItem = styled.li`
  padding-bottom: 8px;
  border-bottom: 1px solid #c9c9c9;
`;

const StyledLabel = styled.label<{ crossed: boolean }>`
  display: flex;
  align-items: center;
  text-decoration: ${(props) => (props.crossed ? 'line-through' : 'none')};
  word-break: break-word;
  white-space: break-spaces;
  margin-right: 20px;
`;

const StyledRemoveBtn = styled.img`
  margin: 0 0 0 10px;
  font-size: 14px;
  cursor: pointer;
`;

const StyledCategoryName = styled.p`
  font-size: 12px;
  color: #969696;
  margin-top: 10px;
`;

export default memo(TodoItem);
