import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import Book from '../Components/Book/Book';
import axios from 'axios';
import Title from '../Components/UI/Title';
import LoadingScreen from '../LoadingScreen';

const Genre = () => {
  const { pathName, genreName } = useParams();

  const genres = useQuery({
    queryKey: ['genres'],
    queryFn: () => {
      return axios.get(
        'https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/genres'
      );
    },
    select: (data) => data.data.data.genres,
  });

  const fetchBooks = (path) => {
    return axios.get(
      `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/books/get-books/${path}`
    );
  };

  const books = useQuery({
    queryKey: ['books', pathName],
    queryFn: () => fetchBooks(pathName),
    select: (data) => data.data.data.books,
  });

  if (genres.isLoading || books.isLoading) return <LoadingScreen />;

  if (books.isFetching) return <LoadingScreen />;

  return (
    <main>
      <section className='py-2 mb-2'>
        <Container>
          <Row>
            <Col md={9}>
              <Title
                element={
                  <h3
                    style={{ fontSize: '20px', color: '#282' }}
                    className='border-bottom pb-2'>
                    {genreName}
                  </h3>
                }
              />

              <div className='books mt-1'>
                {!books.data.length && <p>No Books Found</p>}
                {books?.data?.map((book) => (
                  <Book key={book._id} book={book} />
                ))}
              </div>
            </Col>
            <Col md={3}>
              <aside>
                <Title
                  element={
                    <h6
                      style={{ fontSize: '14px', color: '#282' }}
                      className='border-bottom pb-2'>
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
                  }}>
                  {genres?.data?.map((genre) => (
                    <li key={genre._id} style={{ marginBottom: '5px' }}>
                      <Link
                        to={`/genres/${genre._id}/${genre.genre_name}`}
                        style={{ color: '#2a2a2a', fontWeight: '600' }}>
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
