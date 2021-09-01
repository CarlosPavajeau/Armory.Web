import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = (): ReactElement => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MainLayout;
