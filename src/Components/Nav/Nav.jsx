import PropTypes from 'prop-types';
import { useRouteLoaderData, Link, Form } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavItems from './NavItems';
import NavList from './NavList';
import SearchField from './SearchField';
import { Avatar } from '@mui/material';
import './Nav.css';

function Navigation({ user }) {
  const token = useRouteLoaderData('token');
  return (
    <nav className='custom-nav'>
      <Container>
        <div className='custom-navbar'>
          <div className='nav-brand'>
            <img
              src='/images/bibliophileHub.png'
              alt='bibliophileHub logo'
              className='brand-logo'
            />
          </div>
          <NavItems>
            <NavList path='/' text='Feeds' />
            <NavList path='/mybooks' text='My Books' />
            <NavList path='/genres' text='Genres' />
          </NavItems>
          <SearchField sx={{ width: '400px', fontSize: '16px' }} />
          {token ? (
            <>
              <div className='nav-icon'>
                <Link to={`/friends/${user._id}`}>
                  <img src='/images/icn_nav_friend.svg' alt='profile image' />
                </Link>
              </div>
              <div className='nav-icon'>
                <Avatar alt={user.name} src={user.photo} />
                <div className='dropdown-wrapper'>
                  <ul>
                    <fieldset>
                      <legend>{user.name}</legend>
                      <li>
                        <Link to={`/profile/${user._id}`}>Profile</Link>
                      </li>
                      <li>
                        <Link to={`/friends/${user._id}`}>Friends</Link>
                      </li>
                      <li>
                        <Form method='post' action='/signout'>
                          <button>Sign out</button>
                        </Form>
                      </li>
                    </fieldset>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <NavItems>
              <NavList path='/signin' text='Sing in' />
              <NavList path='/signup' text='Sing up' />
            </NavItems>
          )}
        </div>
      </Container>
    </nav>
  );
}

Navigation.propTypes = {
  user: PropTypes.object,
};

export default Navigation;
