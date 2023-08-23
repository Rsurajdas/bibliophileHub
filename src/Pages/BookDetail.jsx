import { Container, Row, Col } from 'react-bootstrap';
import { useLoaderData, Link } from 'react-router-dom';
import Capitalize from 'lodash.capitalize';
import PostBtn from '../Components/Post/PostBtn';
import parse from 'html-react-parser';
import Rating from '@mui/material/Rating';
import './../Components/Post/Post.css';
import './../Components/Btn/Button.css';

const BookDetail = () => {
  const data = useLoaderData();
  return (
    <main>
      <section style={{ padding: '20px 0' }}>
        <Container>
          <Row>
            <Col md={3}>
              <div className="detail-aside">
                <div className="detail-img">
                  <img src={data.book_image} alt={data.title} />
                </div>
                <PostBtn sx={{ width: '250px', margin: '1rem auto' }} />
                <div
                  className="btn-wrapper"
                  style={{ width: '250px', margin: '1rem auto' }}
                >
                  <a
                    href={data.amazon_product_url}
                    style={{ width: '250px', borderRadius: '2.5rem' }}
                    className="button button-outline text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy on Amazon IN
                  </a>
                </div>
              </div>
            </Col>
            <Col md={9}>
              <div className="detail-content">
                <h1 className="detail-title">
                  {Capitalize(data.title.toLowerCase())}
                </h1>
                <div className="detail-author">{data.author.name}</div>
                <Rating
                  name="read-only"
                  value={4}
                  readOnly
                  size="large"
                  sx={{ padding: '8px', margin: '-8px -8px 0 -8px' }}
                />
                <div className="detail-content">{parse(data.description)}</div>
                <ul className="detail-genres">
                  {data.genres.map((genre) => (
                    <li key={genre._id}>
                      <Link to={genre.genre_name_encoded}>
                        {genre.genre_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default BookDetail;
