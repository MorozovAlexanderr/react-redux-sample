import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  id: string;
  name: string;
  emoji: string;
}

const CategoryItem: FC<Props> = ({ id, name, emoji }): JSX.Element => {
  return (
    <StyledCategoryWrapper>
      <StyledCategory>
        <StyledEmoji>{emoji}</StyledEmoji>
        {name}
      </StyledCategory>
    </StyledCategoryWrapper>
  );
};

const StyledCategoryWrapper = styled.li`
  margin-bottom: 20px;
`;

const StyledCategory = styled.p`
  font-size: 20px;
`;

const StyledEmoji = styled.span`
  margin-right: 10px;
`;

export default CategoryItem;
