import Navigation from './Components/Nav/Nav';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <Outlet />
    </>
  );
};

export default RootLayout;
