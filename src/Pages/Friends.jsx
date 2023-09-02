import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Title from '../Components/UI/Title';
import { Link, useRouteLoaderData, useParams } from 'react-router-dom';
import ProfileList from '../Components/Profile/ProfileList';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useRouteLoaderData('token');
  const { profileId } = useParams();

  const fetchFriends = async (id) => {
    try {
      const res = await fetch(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/friends/${id}`,
        {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setIsLoading(false);
      setFriends(data.data.friends);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFriends(profileId);
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
                        friends.map((friend) => (
                          <ProfileList
                            key={friend._id}
                            profile={friend}
                            btnName="unfriend"
                          />
                        ))}
                    </ul>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="friends-link">
                    <div className="">
                      <Link
                        to={`/following/${profileId}`}
                        style={{ color: '#2a2a2a' }}
                      >
                        People I{`'`}m following
                      </Link>
                    </div>
                    <div className="">
                      <Link
                        to={`/followers/${profileId}`}
                        style={{ color: '#2a2a2a' }}
                      >
                        My followers
                      </Link>
                    </div>
                    <div className="">
                      <Link to="/add-friend" style={{ color: '#2a2a2a' }}>
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

export default Friends;
