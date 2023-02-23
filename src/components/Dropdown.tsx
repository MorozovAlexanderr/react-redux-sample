import { FC, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

export interface Option {
  id: string;
  name: string;
}

interface DropdownOptionProps {
  id: string;
  name: string;
  selected: boolean;
  onClick: (id: string, name: string) => void;
}

interface DropdownProps {
  selectedOptionId: string | null;
  options: Option[];
  defaultPlaceholder?: string;
  emptyListPlaceholder?: string;
  error?: boolean;
  onSelect: (option: Option) => void;
}

const Dropdown: FC<DropdownProps> = ({
  selectedOptionId,
  options,
  defaultPlaceholder = 'Select',
  emptyListPlaceholder = 'No options',
  error,
  onSelect,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  });

  const handleOptionClick = (id: string, name: string) => {
    setIsOpen(false);
    onSelect({ id, name });
  };

  const inputPlaceholder = useMemo(() => {
    const option = options.find((opt) => opt.id === selectedOptionId);
    return option ? option.name : defaultPlaceholder;
  }, [defaultPlaceholder, options, selectedOptionId]);

  return (
    <Container ref={containerRef}>
      <PlaceholderWrapper
        highlighted={error}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <PlaceholderText>{inputPlaceholder}</PlaceholderText>
      </PlaceholderWrapper>
      {isOpen ? (
        <DropdownContent>
          {options.length ? (
            options.map((opt) => (
              <DropdownOption
                key={opt.id}
                id={opt.id}
                name={opt.name}
                selected={opt.id === selectedOptionId}
                onClick={handleOptionClick}
              />
            ))
          ) : (
            <EmptyListPlaceholderText>
              {emptyListPlaceholder}
            </EmptyListPlaceholderText>
          )}
        </DropdownContent>
      ) : null}
    </Container>
  );
};

const DropdownOption: FC<DropdownOptionProps> = ({
  id,
  name,
  selected,
  onClick,
}): JSX.Element => {
  return (
    <StyledDropdownOption selected={selected} onClick={() => onClick(id, name)}>
      {name}
    </StyledDropdownOption>
  );
};

const Container = styled.div`
  position: relative;
`;

const PlaceholderWrapper = styled.div<{ highlighted?: boolean }>`
  height: 35px;
  padding: 8px 15px;
  border: 1px solid ${(props) => (props.highlighted ? '#d40404' : '#007a7e')};
  border-radius: 5px;
  cursor: pointer;
`;

const PlaceholderText = styled.p`
  font-size: 14px;
`;

const DropdownContent = styled.ul`
  width: 100%;
  position: absolute;
  margin-top: 5px;
  min-width: 160px;
  overflow: auto;
  border-radius: 5px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const EmptyListPlaceholderText = styled.p`
  font-size: 12px;
  padding: 15px 0;
  text-align: center;
  color: #8a8a8a;
`;

const StyledDropdownOption = styled.li<{ selected: boolean }>`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  transition: 0.4s;

  background-color: ${(props) => (props.selected ? '#c7c7c7' : '#fff')};

  &:not(:last-child) {
    border-bottom: 1px solid #c9c9c9;
  }

  &:hover {
    background-color: ${(props) => (props.selected ? '#c7c7c7' : '#f0f0f0')};
  }
`;

export default Dropdown;
