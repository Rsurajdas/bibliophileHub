import { useRouteLoaderData } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavItems from './NavItems';
import NavList from './NavList';
import SearchField from './SearchField';
import './Nav.css';

function Navigation() {
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
                <img src="/images/default.jpg" alt="profile image" />
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

export default Navigation;
