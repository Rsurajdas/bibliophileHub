import Container from 'react-bootstrap/Container';

import './Nav.css';
import NavItems from './NavItems';
import NavList from './NavList';

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
            <NavList path="/" text="My Books" />
            <NavList path="/genres" text="Genres" />
          </NavItems>
          <form>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search Books"
              />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>
      </Container>
    </nav>
  );
}

export default Navigation;

{
  /* <Navbar expand="lg" style={{ backgroundColor: '#f1fcf1' }}>
<Container>
  <Navbar.Brand href="#home">
    <img
      src="/images/bibliophileHub.png"
      alt="bibliophileHub logo"
      className="brand-logo"
    />
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto align-items-center">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">My Books</Nav.Link>
      <NavDropdown title="Browse" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">
          Another action
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">
          Separated link
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Community" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">
          Another action
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">
          Separated link
        </NavDropdown.Item>
      </NavDropdown>
      
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar> */
}
