import React, { FC } from 'react';
import styled from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  height?: number;
  error?: boolean;
}

const Input: FC<Props> = ({ width, height, error, ...props }): JSX.Element => {
  return (
    <StyledInput
      {...props}
      type="text"
      width={width}
      height={height}
      highlighted={error}
    />
  );
};

const StyledInput = styled.input<{
  width?: number;
  height?: number;
  highlighted?: boolean;
}>`
  -webkit-appearance: none;
  outline: none;
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  height: ${(props) => props.height || 35}px;
  border: 1px solid ${(props) => (props.highlighted ? '#d40404' : '#007a7e')};
  border-radius: 5px;
  padding: 0 15px;
`;

export default Input;
