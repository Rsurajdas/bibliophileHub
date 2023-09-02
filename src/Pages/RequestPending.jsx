import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Title from '../Components/UI/Title';
import { Link, useRouteLoaderData, useParams } from 'react-router-dom';
import Button from './../Components/Btn/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestPending = () => {
  const [requestPending, setRequestPending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useRouteLoaderData('token');
  const { profileId } = useParams();

  const fetchPendingRequest = async (id) => {
    const res = await fetch(
      `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/request_pending/${id}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setIsLoading(false);
    setRequestPending(data.data.users);
  };

  const handleAcceptRequest = async (id) => {
    try {
      const res = await fetch(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/accept-request/${id}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      await res.json();
      window.location.reload(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCancelRequest = async (id) => {
    try {
      const res = await fetch(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/cancel-request/${id}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      await res.json();
      window.location.reload(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchPendingRequest(profileId);
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
                          Pending Request
                        </h6>
                      }
                    />
                    <ul>
                      {!isLoading &&
                        requestPending.length > 0 &&
                        requestPending.map((profile) => (
                          <li key={profile._id}>
                            <div className="friend-item">
                              <div className="friend-left">
                                <div className="friend-img">
                                  <img src={profile.photo} alt={profile.name} />
                                </div>
                                <div className="friend-detail ps-2">
                                  <h6
                                    className=""
                                    style={{
                                      fontWeight: 700,
                                      fontSize: '14px',
                                      margin: '0',
                                    }}
                                  >
                                    <Link to={`/profile/${profile._id}`}>
                                      {profile.name}
                                    </Link>
                                  </h6>
                                  <div className="">{profile.email}</div>
                                </div>
                              </div>
                              <div className="friend-right">
                                <Button
                                  text="accept"
                                  variant="solid"
                                  onClick={() =>
                                    handleAcceptRequest(profile._id)
                                  }
                                  sx={{
                                    display: 'block',
                                    marginBottom: '10px',
                                  }}
                                />
                                <Button
                                  text="cancel"
                                  variant="solid"
                                  onClick={() =>
                                    handleCancelRequest(profile._id)
                                  }
                                  sx={{
                                    display: 'block',
                                    backgroundColor: '#b8b8b8',
                                  }}
                                />
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                    {!isLoading && requestPending.length < 0 && (
                      <p>No pending request</p>
                    )}
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
      <ToastContainer position="bottom-left" />
    </main>
  );
};

export default RequestPending;
