import { FC } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Sidebar from 'src/components/Sidebar';

// TODO: handle page titles

const Layout: FC = (): JSX.Element => {
  return (
    <>
      <Sidebar />
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 50px;
`;

export default Layout;
