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
    <nav className="custom-nav">
      <Container>
        <div className="custom-navbar">
          <div className="nav-brand">
            <img
              src="/images/bibliophileHub.png"
              alt="bibliophileHub logo"
              className="brand-logo"
            />
          </div>
          <NavItems>
            <NavList path="/" text="Home" />
            <NavList path="/mybooks" text="My Books" />
            <NavList path="/genres" text="Genres" />
          </NavItems>
          <SearchField sx={{ width: '400px', fontSize: '16px' }} />
          {token ? (
            <>
              <div className="nav-icon">
                <img src="/images/icn_nav_friend.svg" alt="profile image" />
              </div>
              <div className="nav-icon">
                <Avatar
                  alt={user.name}
                  src={`http://127.0.0.1:3000${user.photo}`}
                />
                {/* <img
                  src={`http://127.0.0.1:3000${user.photo}`}
                  alt={user.name}
                /> */}
                <div className="dropdown-wrapper">
                  <ul>
                    <fieldset>
                      <legend>{user.name}</legend>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/friends">Friends</Link>
                      </li>
                      <li>
                        <Form method="post" action="/signout">
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
              <NavList path="/signin" text="Sing in" />
              <NavList path="/signup" text="Sing up" />
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
