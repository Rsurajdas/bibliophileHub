import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Title from '../Components/UI/Title';
import Book from '../Components/Book/Book';
import LoadingScreen from '../LoadingScreen';
import ErrorMessage from '../Components/Error/ErrorMessage';

const Genres = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['books-by-genres'],
    queryFn: () => {
      return axios.get(
        'https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/books/genres/grouped-by-genres'
      );
    },
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <main>
      <Container>
        <Row>
          <Col md={8}>
            {data?.data.data.map((genre) => (
              <section className='py-2 mb-2' key={genre._id}>
                <Row>
                  <Col md={12}>
                    <Title
                      element={
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}>
                          <h3 style={{ fontSize: '20px' }}>
                            <Link
                              to={`${genre._id}/${genre.genre_name}`}
                              style={{ color: '#282' }}>
                              {genre.genre_name}
                            </Link>
                          </h3>
                          <Link to={`${genre._id}/${genre.genre_name}`}>
                            More...
                          </Link>
                        </div>
                      }
                    />
                    <div className='books mt-1'>
                      {genre.books.map((book) => (
                        <Book key={book._id} book={book} />
                      ))}
                    </div>
                    <div
                      className='d-flex'
                      style={{ justifyContent: 'flex-end' }}></div>
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
