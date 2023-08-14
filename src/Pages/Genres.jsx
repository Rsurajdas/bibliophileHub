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
          'https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=9OfKWlVWBGblOdFYAXwaJiLk6c6vwBI0',
          { signal: controller.signal }
        );
        const { data } = res;
        const { results } = data;
        setData(results.lists);
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
            {isLoading && <p>Loading...</p>}
            {!isLoading &&
              data.map((detail) => (
                <section className="py-4" key={detail.list_id}>
                  <Row>
                    <Col md={12}>
                      <Title
                        element={
                          <h3 style={{ fontSize: '20px' }}>
                            <Link
                              to={detail.list_name_encoded}
                              style={{ color: '#282' }}
                            >
                              {detail.display_name}
                            </Link>
                          </h3>
                        }
                      />
                      <div className="books mt-3">
                        {detail.books.map((book) => (
                          <Book key={book.title} book={book} />
                        ))}
                      </div>
                      <div
                        className="d-flex"
                        style={{ justifyContent: 'flex-end' }}
                      >
                        <Link to={detail.list_name_encoded}>More...</Link>
                      </div>
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
