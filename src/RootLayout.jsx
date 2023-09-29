import Navigation from './Components/Nav/Nav';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useEffect } from 'react';
import { getUserData } from './store/actions/userAction';

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
