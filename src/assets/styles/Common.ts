import styled from 'styled-components';

export const FlexContainer = styled.div<{ direction?: 'row' | 'column' }>`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => props.direction || 'row'};
`;

export const SpacedFlexContainer = styled(FlexContainer)`
  justify-content: space-between;
`;
