import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Title from '../Components/UI/Title';
import { useRouteLoaderData } from 'react-router-dom';
import Button from '../Components/Btn/Button';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useRouteLoaderData('token');

  const fetchFriends = async () => {
    try {
      const res = await fetch('http://127.0.0.1:3000/api/v1/users/friends', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      setIsLoading(false);
      setFriends(data.data.friends);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <main>
      <section className="py-5">
        <Container>
          <Row>
            <Col md={6}>
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
                      <li key={friend._id}>
                        <div className="friend-item">
                          <div className="friend-left">
                            <div className="friend-img">
                              <img
                                src={`http://127.0.0.1:3000${friend.photo}`}
                                alt={friend.name}
                              />
                            </div>
                            <div className="friend-detail">
                              <h6
                                className=""
                                style={{
                                  fontWeight: 700,
                                  fontSize: '14px',
                                  margin: '0',
                                }}
                              >
                                {friend.name}
                              </h6>
                              <div className="">{friend.email}</div>
                            </div>
                          </div>
                          <div className="friend-right">
                            <Button text="unfriend" variant="solid" />
                          </div>
                        </div>
                      </li>
                    ))}
                  {!isLoading &&
                    friends.map((friend) => (
                      <li key={friend._id}>
                        <div className="friend-item">
                          <div className="friend-left">
                            <div className="friend-img">
                              <img
                                src={`http://127.0.0.1:3000${friend.photo}`}
                                alt={friend.name}
                              />
                            </div>
                            <div className="friend-detail">
                              <h6
                                className=""
                                style={{
                                  fontWeight: 700,
                                  fontSize: '14px',
                                  margin: '0',
                                }}
                              >
                                {friend.name}
                              </h6>
                              <div className="">{friend.email}</div>
                            </div>
                          </div>
                          <div className="friend-right">
                            <Button text="unfriend" variant="solid" />
                          </div>
                        </div>
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

export default Friends;
