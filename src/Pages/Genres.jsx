import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Title from '../Components/UI/Title';
import Book from '../Components/Book/Book';

const Genres = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          'http://127.0.0.1:3000/api/v1/books/genres/grouped-by-genres',
          {
            signal: controller.signal,
          }
        );
        const { data } = res;

        setData(data.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();

    return () => controller.abort;
  }, []);

  return (
    <main>
      <Container>
        <Row>
          <Col md={8}>
            {console.log(data)}
            {isLoading && <p>Loading...</p>}
            {!isLoading &&
              data.map((genre) => (
                <section className="py-2 mb-2" key={genre._id}>
                  <Row>
                    <Col md={12}>
                      <Title
                        element={
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <h3 style={{ fontSize: '20px' }}>
                              <Link
                                to={`${genre._id}/${genre.genre_name}`}
                                style={{ color: '#282' }}
                              >
                                {genre.genre_name}
                              </Link>
                            </h3>
                            <Link to={`${genre._id}/${genre.genre_name}`}>
                              More...
                            </Link>
                          </div>
                        }
                      />
                      <div className="books mt-1">
                        {genre.books.map((book) => (
                          <Book key={book.title} book={book} />
                        ))}
                      </div>
                      <div
                        className="d-flex"
                        style={{ justifyContent: 'flex-end' }}
                      ></div>
                    </Col>
                  </Row>
                </section>
              ))}
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </main>
  );
};

export default Genres;
