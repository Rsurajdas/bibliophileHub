import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Book from '../Components/Book/Book';
import axios from 'axios';
import Title from '../Components/UI/Title';

const Genre = () => {
  const [data, setData] = useState([]);
  const [heading, setHeading] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { pathName } = useParams();

  useEffect(() => {
    const fetchData = async (path) => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/current/${path}.json?api-key=9OfKWlVWBGblOdFYAXwaJiLk6c6vwBI0`
        );
        const { data } = res;
        setData(data.results.books.map((book) => book));
        setHeading(data.results.list_name);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(pathName);
  }, [pathName]);

  return (
    <main>
      <section style={{ padding: '5rem 0' }}>
        <Container>
          <Row>
            <Col md={12}>
              <Title
                element={
                  <h3 style={{ fontSize: '20px', color: '#282' }}>{heading}</h3>
                }
              />
              <div
                className="books mt-4"
                style={{
                  display: 'grid',
                  'gridTemplateColumns': 'repeat(7, 1fr)',
                  'rowGap': '3%',
                }}
              >
                {!isLoading &&
                  data.map((book) => <Book key={book.rank} book={book} />)}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Genre;
