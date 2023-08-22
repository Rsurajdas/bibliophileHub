import Container from 'react-bootstrap/Container';
import './Nav.css';
import NavItems from './NavItems';
import NavList from './NavList';
import SearchField from './SearchField';

function Navigation() {
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
          <SearchField sx={{ width: '305px', fontSize: '16px' }} />
          <div className="nav-icon">
            <img src="/images/default.jpg" alt="profile image" />
          </div>
          <div className="nav-icon">
            <img src="/images/icn_nav_friend.svg" alt="profile image" />
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navigation;
