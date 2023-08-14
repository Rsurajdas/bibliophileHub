import { Col, Container, Row } from 'react-bootstrap';
import Post from '../Components/Post/Post';

const Home = () => {
  return (
    <section style={{ padding: '50px 0' }}>
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Post />
            <Post />
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
