import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Avatar, AvatarGroup } from '@mui/material';
import { Link, useRouteLoaderData, useParams } from 'react-router-dom';
import Post from '../Components/Post/Post';
import Title from '../Components/UI/Title';
import CurrentlyReading from '../Components/Book/CurrentlyReading';
import { getUserId } from '../utils/auth';
import LoadingScreen from '../LoadingScreen';
import './../Components/Nav/Search.css';

const Profile = () => {
  const token = useRouteLoaderData('token');
  let { profileId } = useParams();
  const currentUser = getUserId();

  const fetchUser = async (id) => {
    return axios.get(
      `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/get-user/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
  };

  const {
    data: user,
    isLoading: userLoading,
    isFetching: userFetching,
  } = useQuery({
    queryKey: ['user', profileId],
    queryFn: () => fetchUser(profileId),
    select: (data) => data.data.data.user,
  });

  const fetchPosts = async (id) => {
    return axios.get(
      `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/posts/get-posts/${id}`,
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    );
  };

  const {
    data: posts,
    isLoading: postLoading,
    isFetching: postFetching,
  } = useQuery({
    queryKey: ['user-posts', profileId],
    queryFn: () => fetchPosts(profileId),
    select: (data) => data.data.data.posts,
  });

  const fetchReading = async (id) => {
    return axios.get(
      `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/shelf/get-currently-reading/books/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
  };

  const {
    data: readings,
    isLoading: readLoading,
    isFetching: readFetching,
  } = useQuery({
    queryKey: ['readings', profileId],
    queryFn: () => fetchReading(profileId),
    select: (data) => data.data.data.books,
  });

  if (userLoading || postLoading || readLoading) return <LoadingScreen />;

  if (userFetching || postFetching || readFetching) return <LoadingScreen />;

  return (
    <main>
      <section className="py-4 mb-2">
        <Container>
          <Row>
            <Col md={8} className="px-5">
              <div className="profile-details">
                <Row>
                  <Col md={3}>
                    <Avatar
                      sizes="large"
                      alt={user.name}
                      src={user.photo}
                      sx={{ width: '150px', height: '150px', margin: '0 auto' }}
                    />
                  </Col>
                  <Col md={9}>
                    <div className="profile-details_content">
                      <h5 className="border-bottom pb-1">{user.name}</h5>
                      <div style={{ fontSize: '14px' }}>
                        <div className="">
                          <span style={{ fontWeight: 700 }}>Email:</span>{' '}
                          {user.email}
                        </div>
                        <div className="">
                          <span style={{ fontWeight: 700 }}>Friends:</span>{' '}
                          <Link to={`/user/friends/${user._id}`}>
                            {user.friends?.length} friends
                          </Link>
                        </div>
                        <div className="">
                          <span style={{ fontWeight: 700 }}>Followers:</span>{' '}
                          <Link to={`/user/followers/${profileId}`}>
                            {user.followers?.length} followers
                          </Link>
                        </div>
                        <div className="">
                          <span style={{ fontWeight: 700 }}>Following:</span>{' '}
                          <Link to={`/user/following/${user._id}`}>
                            {user.following?.length} following
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="user-posts mt-5">
                      <Title
                        element={
                          <h5 className="border-bottom pb-2 mb-4">
                            User{`'`}s Post
                          </h5>
                        }
                      />
                      {posts.length > 0 &&
                        posts.map((post) => (
                          <Post key={post._id} post={post} />
                        ))}
                      {posts.length === 0 && <p>No post found!</p>}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={4}>
              <div className="user-following mt-4">
                <Title
                  element={
                    <h6
                      className="border-bottom pb-2 mb-2"
                      style={{ fontWeight: 700, fontSize: '14px' }}
                    >
                      {user.name} is following
                    </h6>
                  }
                />
                {user.following?.length && (
                  <AvatarGroup
                    max={4}
                    total={user.following?.length}
                    sx={{ justifyContent: 'flex-end' }}
                  >
                    {user.following?.map((following) => (
                      <Avatar
                        key={following._id}
                        alt={following.name}
                        src={following.photo}
                      />
                    ))}
                  </AvatarGroup>
                )}
                {!user.following?.length && <p>you following no one</p>}
              </div>
              {user.request_pending?.length && currentUser === profileId ? (
                <div className="user-following mt-4">
                  <Title
                    element={
                      <div className="d-flex align-items-center border-bottom pb-2 mb-2 justify-content-between">
                        <h6
                          style={{
                            fontWeight: 700,
                            fontSize: '14px',
                            margin: 0,
                          }}
                        >
                          Pending request
                        </h6>
                        <Link to={`/request-pending/${profileId}`}>
                          more...
                        </Link>
                      </div>
                    }
                  />
                  <AvatarGroup
                    max={4}
                    total={user.request_pending?.length}
                    sx={{ justifyContent: 'flex-end' }}
                  >
                    {user.request_pending?.map((profile) => (
                      <Avatar
                        key={profile._id}
                        alt={profile.name}
                        src={profile.photo}
                      />
                    ))}
                  </AvatarGroup>
                </div>
              ) : null}
              <div className="currently-reading mt-4">
                <Title
                  element={
                    <h6
                      className="border-bottom pb-2 mb-2"
                      style={{ fontWeight: 700, fontSize: '14px' }}
                    >
                      {user.name} currently reading
                    </h6>
                  }
                />
                <div className="mt-3">
                  {readings?.map((data) => (
                    <CurrentlyReading
                      key={data.book._id}
                      book={data}
                      currentUser={currentUser === profileId ? true : false}
                    />
                  ))}
                  {!readings.length && (
                    <p>Add books to Currently reading shelf</p>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Profile;
