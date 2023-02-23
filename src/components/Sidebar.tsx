import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar: FC = (): JSX.Element => {
  return (
    <StyledSidebar>
      <nav>
        <ul>
          <li>
            <Link to="todos/create">Create todo</Link>
          </li>
          <li>
            <Link to="todos">Todo List</Link>
          </li>
          <li>
            <Link to="categories">Categories</Link>
          </li>
        </ul>
      </nav>
    </StyledSidebar>
  );
};

const StyledSidebar = styled.div`
  height: 100vh;
  width: 15rem;
  padding-left: 3rem;
  padding-top: 2rem;
  background-color: #ededed;
  border-right: 1px solid #d9d9d9;

  & li {
    margin-bottom: 20px;
  }

  & a {
    font-size: 18px;
    color: #1c1c1c;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      color: inherit;
    }
  }
`;

export default Sidebar;
