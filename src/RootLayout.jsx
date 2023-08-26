import { useEffect } from 'react';
import Navigation from './Components/Nav/Nav';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getUserData } from './store/actions/userAction';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const { user } = useSelector((state) => state.user, shallowEqual);

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
