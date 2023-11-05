import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Title from '../Components/UI/Title';
import { Link, useRouteLoaderData, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Avatar } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Empty, message } from 'antd';
import LoadingScreen from '../LoadingScreen';

const RequestPending = () => {
  const token = useRouteLoaderData('token');
  const { profileId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { data: pendingRequests, isLoading } = useQuery({
    queryKey: ['request_pending', profileId, token],
    queryFn: () => {
      return axios.get(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/request_pending/${profileId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    },
    select: (data) => data.data.data.users,
  });

  const { isLoading: loading, mutate: handleFriendRequest } = useMutation({
    mutationFn: async ({ action, id }) => {
      return axios.post(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/${action}/${id}`,
        null,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      messageApi.open({
        type: 'success',
        content: data.data.message,
      });
      queryClient.invalidateQueries({
        queryKey: ['request_pending', profileId, token],
      });
    },
    onError: (err) => {
      messageApi.open({
        type: 'error',
        content: err.message,
      });
    },
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <main>
      {contextHolder}
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
                      {!pendingRequests.length ? (
                        <Empty />
                      ) : (
                        pendingRequests.map((profile) => (
                          <li key={profile._id}>
                            <div className="friend-item">
                              <div className="friend-left">
                                <div className="friend-img">
                                  <Avatar
                                    src={profile.photo}
                                    alt={profile.name}
                                    size="larger"
                                  />
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
                                  type="primary"
                                  className="button-solid"
                                  loading={loading}
                                  onClick={() =>
                                    handleFriendRequest({
                                      action: 'accept-request',
                                      id: profile._id,
                                    })
                                  }
                                >
                                  accept
                                </Button>
                                <Button
                                  className="button-outline"
                                  onClick={() =>
                                    handleFriendRequest({
                                      action: 'cancel-request',
                                      id: profile._id,
                                    })
                                  }
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </li>
                        ))
                      )}
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
      <ToastContainer position="bottom-left" />
    </main>
  );
};

export default RequestPending;
