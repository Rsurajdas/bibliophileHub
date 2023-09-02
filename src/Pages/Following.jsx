import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Title from '../Components/UI/Title';
import { Link, useRouteLoaderData, useParams } from 'react-router-dom';
import ProfileList from '../Components/Profile/ProfileList';

const Following = () => {
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useRouteLoaderData('token');
  const { profileId } = useParams();

  const fetchFollowing = async (id) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/users/following/${id}`,
        {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setIsLoading(false);
      setFollowing(data.data.following);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFollowing(profileId);
  }, [profileId]);

  return (
    <main>
      <section className="py-5">
        <Container>
          <Row>
            <Col md={10} className="mx-auto">
              <Row className="gx-5">
                <Col md={8}>
                  <div className="friends-wrapper">
                    <Title
                      element={
                        <h6
                          className="border-bottom pb-2 mb-2"
                          style={{
                            fontWeight: 700,
                            fontSize: '14px',
                          }}
                        >
                          Friends
                        </h6>
                      }
                    />
                    <ul>
                      {!isLoading &&
                        following.map((friend) => (
                          <ProfileList
                            profile={friend}
                            key={friend._id}
                            btnName="unfollow"
                          />
                        ))}
                    </ul>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="friends-link">
                    <div className="">
                      <Link to="/following" style={{ color: '#2a2a2a' }}>
                        People I{`'`}m following
                      </Link>
                    </div>
                    <div className="">
                      <Link to="/following" style={{ color: '#2a2a2a' }}>
                        My followers
                      </Link>
                    </div>
                    <div className="">
                      <Link to="/add-friends" style={{ color: '#2a2a2a' }}>
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

export default Following;
