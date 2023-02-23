import React, { FC } from 'react';
import styled from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button: FC<Props> = ({ title, ...props }): JSX.Element => {
  return <StyledButton {...props}>{title}</StyledButton>;
};

const StyledButton = styled.button`
  border: unset;
  width: 70px;
  height: 35px;
  border-radius: 5px;
  background-color: #007a7e;
  color: #ffff;
  cursor: pointer;
  letter-spacing: 1px;

  &:hover {
    opacity: 0.9;
    transition: 0.2s;
  }
`;

export default Button;
