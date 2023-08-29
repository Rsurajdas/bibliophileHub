import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchField from '../Components/Nav/SearchField';
import MenuIcon from '@mui/icons-material/Menu';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Button from '../Components/Btn/Button';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Table from '../Components/Table/Table';
import Grid from '../Components/Layout/Grid';
import './../Components/Btn/Button.css';
import AddShelf from '../Components/Shelf/AddShelf';
import 'react-toastify/dist/ReactToastify.css';

const MyBooks = () => {
  const [showTable, setShowTable] = useState(true);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shelves, setShelves] = useState([]);
  const token = useRouteLoaderData('token');

  const fetchBooks = async () => {
    const res = await fetch(
      'http://127.0.0.1:3000/api/v1/shelf/all-books-user-shelves',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setIsLoading(false);
    setBooks(data.data.books);
  };

  const fetchShelves = async () => {
    const res = await fetch('http://127.0.0.1:3000/api/v1/shelf', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setIsLoading(false);
    setShelves(data.data.shelves);
  };

  const fetchBooksByShelf = async (id) => {
    const res = await fetch(`http://127.0.0.1:3000/api/v1/shelf/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setIsLoading(false);
    setBooks(data.data.shelf.books);
  };

  const removeBook = async (shelfId, bookId) => {
    const confirm = window.confirm(
      'Are you sure want to remove this book from shelf?'
    );
    if (confirm) {
      try {
        const res = await fetch(
          `http://127.0.0.1:3000/api/v1/shelf/remove-book/${shelfId}/${bookId}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        await res.json();
        window.location.reload(true);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    fetchShelves();
  }, []);

  return (
    <main>
      <section style={{ paddingBottom: '50px' }}>
        {console.log(shelves)}
        <Container>
          <Row className="align-items-center border-bottom pt-3 pb-2">
            <Col md={6}>
              <div className="section-header">
                <h1
                  style={{
                    fontSize: '25px',
                    lineHeight: '26px',
                    fontWeight: 600,
                    color: '#282',
                  }}
                >
                  My Books
                </h1>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex gx-2 justify-content-end">
                <SearchField sx={{ width: '250px', fontSize: '13px' }} />
                <Button
                  sx={{ padding: '5px' }}
                  element={<MenuIcon />}
                  onClick={() => {
                    setShowTable(true);
                  }}
                />
                <Button
                  sx={{ padding: '5px' }}
                  element={<WidgetsIcon />}
                  onClick={() => {
                    setShowTable(false);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={3}>
              <div className="book-shelf border-bottom">
                <h4>
                  BookShelves <Link to="/">Edit</Link>
                </h4>
                <div className="pb-2">
                  <AddShelf setShelves={setShelves} />
                </div>
                <ul className="mb-2">
                  <li>
                    <Button
                      className="button"
                      variant="text"
                      text="All"
                      onClick={fetchBooks}
                    />
                  </li>
                  {!isLoading &&
                    shelves &&
                    shelves.map((shelf) => (
                      <li key={shelf._id}>
                        <Button
                          className="button"
                          variant="text"
                          text={shelf.shelf_name}
                          onClick={() => fetchBooksByShelf(shelf._id)}
                        />
                      </li>
                    ))}
                </ul>
              </div>
            </Col>
            <Col md={9}>
              {showTable ? (
                <div className="book-table">
                  <Table
                    books={books}
                    removeBook={removeBook}
                    shelves={shelves}
                  />
                </div>
              ) : (
                <div className="book-grid">
                  <Grid
                    sx={{
                      gridTemplateColumns: 'repeat(7, 120px)',
                      gridGap: '2.1%',
                    }}
                  >
                    {books &&
                      books.map((book) => (
                        <div className="item" key={book.book._id}>
                          <div className="item-img">
                            <Link to={`/book/${book.book._id}`}>
                              <img
                                src={book.book.book_image}
                                alt={book.book.title}
                              />
                            </Link>
                          </div>
                          <Link to="/edit" className="float-link">
                            edit
                          </Link>
                        </div>
                      ))}
                    {books.length === 0 && (
                      <div
                        className="item"
                        style={{ gridColumn: '1 / 8', textAlign: 'center' }}
                      >
                        No book was found on the shelf.
                      </div>
                    )}
                  </Grid>
                </div>
              )}
            </Col>
          </Row>
        </Container>
        <ToastContainer position="bottom-left" />
      </section>
    </main>
  );
};

export default MyBooks;
