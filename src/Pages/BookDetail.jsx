import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLoaderData, Link } from 'react-router-dom';
import Button from './../Components/Btn/Button';
import Capitalize from 'lodash.capitalize';
import PostBtn from '../Components/Post/PostBtn';
import parse from 'html-react-parser';
import Rating from '@mui/material/Rating';
import './../Components/Post/Post.css';
import './../Components/Btn/Button.css';

const BookDetail = () => {
  const data = useLoaderData();
  const [res, setRes] = useState({});
  const handleAddFollower = async () => {
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/users/follow/64e3b868e1defc3cacbeadf9`,
      {
        method: 'POST',
        headers: {
          'Authorization':
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGUxZDIxODNmMDY0MDU5MGZhZjg4MiIsImlhdCI6MTY5MjkwOTAwMSwiZXhwIjoxNjkzNTEzODAxfQ.6UNnUrODzHNb1guppf8OOiIHP5e2VJWD5XE_sCMbQNc',
        },
      }
    );

    const data = await res.json();

    setRes(data);
  };

  return (
    <main>
      {console.log(res)}
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
                <ul className="detail-genres mb-4 border-bottom pb-4">
                  {data.genres.map((genre) => (
                    <li key={genre._id}>
                      <Link to={genre.genre_name_encoded}>
                        {genre.genre_name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="book-edition pb-4 border-bottom">
                  <h6>This edition</h6>
                  <div className="edition-item">
                    <dt>Published</dt>
                    <dd>by {data.publisher}</dd>
                  </div>
                  <div className="edition-item">
                    <dt>ISBN</dt>
                    <dd>
                      {data.primary_isbn13} (ISBN10: {data.primary_isbn10})
                    </dd>
                  </div>
                </div>
                <div className="author d-flex mt-4 border-bottom pb-4">
                  <div className="author-left d-flex ">
                    <div className="author-image">
                      <img
                        src={`http://127.0.0.1:3000${data.author.photo}`}
                        alt=""
                      />
                    </div>
                    <div className="author-details mt-1">
                      <h6>{data.author.name}</h6>
                      <div className="">
                        {data.author.followers.length} followers
                      </div>
                    </div>
                  </div>
                  <div className="author-right">
                    <Button
                      type="button"
                      variant="solid"
                      text={res.status === 'success' ? 'Following' : 'Follow'}
                      onClick={handleAddFollower}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default BookDetail;
