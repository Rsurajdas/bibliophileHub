import { Container, Row, Col } from 'react-bootstrap';
import SearchField from '../Components/Nav/SearchField';
import { Link, NavLink, Outlet } from 'react-router-dom';
import AddShelf from '../Components/Shelf/AddShelf';
import '../Components/Btn/Button.css';
import 'react-toastify/dist/ReactToastify.css';
import { useShelves } from '../hooks/useShelves';

const MyBooks = () => {
  const shelves = useShelves();

  return (
    <main>
      <section style={{ paddingBottom: '50px' }}>
        <Container>
          <Row className='align-items-center border-bottom pt-3 pb-2'>
            <Col md={6}>
              <div className='section-header'>
                <h1
                  style={{
                    fontSize: '25px',
                    lineHeight: '26px',
                    fontWeight: 600,
                    color: '#282',
                  }}>
                  My Books
                </h1>
              </div>
            </Col>
            <Col md={6}>
              <div className='d-flex gx-2 justify-content-end'>
                <SearchField sx={{ width: '250px', fontSize: '13px' }} />
              </div>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col md={3}>
              <div className='book-shelf border-bottom'>
                <h4>
                  BookShelves <Link to='/'>Edit</Link>
                </h4>
                <div className='pb-2'>
                  <AddShelf />
                </div>
                <nav className='book-shelf-nav'>
                  <ul className='mb-2'>
                    <li>
                      <NavLink to='table/all'>All</NavLink>
                    </li>
                    {shelves?.map((shelf) => (
                      <li key={shelf._id}>
                        <NavLink to={`table/${shelf._id}`}>
                          {shelf.shelf_name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </Col>
            <Col md={9}>
              <div className='book-shelf'>
                <Outlet />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default MyBooks;
