import { Container, Row, Col } from 'react-bootstrap';
import { Link, useParams, Outlet } from 'react-router-dom';

const SocialLayout = () => {
  const { profileId } = useParams();

  return (
    <main>
      <section className='py-5'>
        <Container>
          <Row>
            <Col md={10} className='mx-auto'>
              <Row className='gx-5'>
                <Col md={8}>
                  <Outlet />
                </Col>
                <Col md={4}>
                  <div className='friends-link'>
                    <div className=''>
                      <Link
                        to={`/user/following/${profileId}`}
                        style={{ color: '#2a2a2a' }}>
                        People I{`'`}m following
                      </Link>
                    </div>
                    <div className=''>
                      <Link
                        to={`/user/followers/${profileId}`}
                        style={{ color: '#2a2a2a' }}>
                        My followers
                      </Link>
                    </div>
                    <div className=''>
                      <Link to='/add-friend' style={{ color: '#2a2a2a' }}>
                        Add friends
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default SocialLayout;
