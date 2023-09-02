import { Col, Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouteLoaderData, useLoaderData } from 'react-router-dom';
import Post from '../Components/Post/Post';
import Title from './../Components/UI/Title';
import CurrentlyReading from '../Components/Book/CurrentlyReading';
import { getUserId } from '../utils/auth';

const Home = () => {
  const [reading, setReading] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useRouteLoaderData('token');
  const posts = useLoaderData();
  const userId = getUserId();

  const fetchReading = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/shelf/get-currently-reading/books/${userId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setIsLoading(false);
      setReading(data.data.books);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReading();
  }, []);

  return (
    <section style={{ padding: '50px 0' }}>
      <Container>
        <Row className="gx-5">
          <Col md={3}>
            <div className="currently-reading">
              <Title element={<h5>Currently Reading</h5>} />
              <div className="mt-3">
                {!isLoading &&
                  reading.map((data) => (
                    <CurrentlyReading
                      key={data.book._id}
                      book={data}
                      currentUser={true}
                    />
                  ))}
              </div>
            </div>
          </Col>
          <Col md={6}>
            {posts && posts.map((post) => <Post key={post._id} post={post} />)}
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
