import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Book from '../Components/Book/Book';
import axios from 'axios';
import Title from '../Components/UI/Title';

const Genre = () => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pathName, genreName } = useParams();

  useEffect(() => {
    const fetchData = async (path) => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:3000/api/v1/books/get-books/${path}`
        );
        const { data } = res;
        setData(data.data.books);
        setIsLoading(false);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchData(pathName);
  }, [pathName]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:3000/api/v1/genres');
        const { data } = res;
        setGenres(data.data.genres);
        setIsLoading(false);
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchGenres();
  }, []);

  return (
    <main>
      <section style={{ padding: '2rem 0 5rem' }}>
        {console.log(genres)}
        <Container>
          <Row>
            <Col md={9}>
              <Title
                element={
                  <h3
                    style={{ fontSize: '20px', color: '#282' }}
                    className="border-bottom pb-2"
                  >
                    {genreName}
                  </h3>
                }
              />
              <div className="books mt-1">
                {!isLoading &&
                  data.map((book) => <Book key={book._id} book={book} />)}
              </div>
            </Col>
            <Col md={3}>
              <aside>
                <Title
                  element={
                    <h6
                      style={{ fontSize: '14px', color: '#282' }}
                      className="border-bottom pb-2"
                    >
                      All genres
                    </h6>
                  }
                />
                <ul
                  style={{
                    fontSize: '12px',
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {genres &&
                    genres.map((genre) => (
                      <li key={genre._id} style={{ marginBottom: '5px' }}>
                        <Link
                          to={`/genres/${genre._id}/${genre.genre_name}`}
                          style={{ color: '#2a2a2a', fontWeight: '600' }}
                        >
                          {genre.genre_name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </aside>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Genre;
