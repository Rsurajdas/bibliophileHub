import { Col, Container, Row } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouteLoaderData } from 'react-router-dom';
import Post from '../Components/Post/Post';
import Title from './../Components/UI/Title';
import CurrentlyReading from '../Components/Book/CurrentlyReading';
import { getUserId } from '../utils/auth';
import LoadingScreen from '../LoadingScreen';
import { Empty } from 'antd';

const Home = () => {
  const token = useRouteLoaderData('token');
  const userId = getUserId();

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['social-posts', token],
    queryFn: () => {
      return axios.get(
        'https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/posts/social-posts',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    },
    select: (data) => data.data.data.posts,
  });

  const fetchReading = () => {
    return axios.get(
      `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/shelf/get-currently-reading/books/${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
  };

  const { data: readings, isLoading: readLoading } = useQuery({
    queryKey: ['currently readings'],
    queryFn: fetchReading,
    select: (data) => data.data.data.books,
  });

  if (postsLoading && readLoading) return <LoadingScreen />;

  return (
    <section style={{ padding: '50px 0' }}>
      <Container>
        <Row className="gx-5">
          <Col md={3}>
            <div className="currently-reading">
              <Title element={<h5>Currently Reading</h5>} />
              <div className="mt-3">
                {readings?.map((data) => (
                  <CurrentlyReading
                    key={data.book._id}
                    book={data}
                    currentUser={true}
                  />
                ))}
                {!readings?.length ? <Empty /> : null}
              </div>
            </div>
          </Col>
          <Col md={6}>
            {posts?.map((post) => (
              <Post key={post._id} post={post} />
            ))}
            {!posts?.length ? <Empty /> : null}
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
