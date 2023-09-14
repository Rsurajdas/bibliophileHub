import { Col, Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import Post from '../Components/Post/Post';
import Title from './../Components/UI/Title';
import CurrentlyReading from '../Components/Book/CurrentlyReading';
import { getUserId } from '../utils/auth';

const Home = () => {
  const [reading, setReading] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useRouteLoaderData('token');
  const [posts, setPosts] = useState([]);
  const userId = getUserId();

  const fetchSocialPost = async () => {
    try {
      const res = await fetch(
        'https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/posts/social-posts',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setIsLoading(false);
      setPosts(data.data.posts);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchReading = async () => {
    try {
      const res = await fetch(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/shelf/get-currently-reading/books/${userId}`,
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

  useEffect(() => {
    fetchSocialPost();
  }, []);

  return (
    <section style={{ padding: '50px 0' }}>
      <Container>
        <Row className='gx-5'>
          <Col md={3}>
            <div className='currently-reading'>
              <Title element={<h5>Currently Reading</h5>} />
              <div className='mt-3'>
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
