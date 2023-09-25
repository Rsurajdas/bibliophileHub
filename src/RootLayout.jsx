import Navigation from './Components/Nav/Nav';
import { Outlet } from 'react-router-dom';
import { useUser } from './Context/UserProvider';
import LoadingScreen from './LoadingScreen';

const RootLayout = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <LoadingScreen />;
  return (
    <>
      <header>
        <Navigation user={user} />
      </header>
      <Outlet />
    </>
  );
};

export default RootLayout;
