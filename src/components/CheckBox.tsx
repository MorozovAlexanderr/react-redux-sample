import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  checked: boolean;
  onChange: (status: boolean) => void;
}

const CheckBox: FC<Props> = ({ checked, onChange }): JSX.Element => {
  return (
    <StyledCheckBox
      type="checkbox"
      checked={checked}
      onChange={() => onChange(!checked)}
    />
  );
};

const StyledCheckBox = styled.input`
  -webkit-appearance: none;
  appearance: none;
  min-width: 20px;
  min-height: 20px;
  margin: 0 10px 0 0;
  border-radius: 2px;
  border: 2px solid #007a7e;
  outline: none;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #ffff;
    
    &:after {
      content: "";
      position: absolute;
      border-radius: 2px;
      top: 2px;
      left: 2px;
      width: 12px;
      height: 12px;
      background-color: #007a7e;
  }
`;

export default CheckBox;
