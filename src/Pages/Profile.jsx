import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Avatar, AvatarGroup } from '@mui/material';
import { Link, useRouteLoaderData, useParams } from 'react-router-dom';
import Post from '../Components/Post/Post';
import Title from '../Components/UI/Title';
import CurrentlyReading from '../Components/Book/CurrentlyReading';
import { getUserId } from '../utils/auth';
import './../Components/Nav/Search.css';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reading, setReading] = useState([]);
  const token = useRouteLoaderData('token');
  const [user, setUser] = useState({});
  let { profileId } = useParams();
  const currentUser = getUserId();

  const fetchUser = async (id) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/users/get-user/${id}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setIsLoading(false);
      setUser(data.data.user);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchPosts = async (id) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/posts/get-posts/${id}`,
        {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setIsLoading(false);
      setPosts(data.data.posts);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchReading = async (id) => {
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/shelf/get-currently-reading/books/${id}`,
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
  };

  useEffect(() => {
    fetchReading(profileId);
  }, [profileId]);

  useEffect(() => {
    fetchPosts(profileId);
  }, [profileId]);

  useEffect(() => {
    fetchUser(profileId);
  }, [profileId]);

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
                      src={`http://127.0.0.1:3000${user.photo}`}
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
                          <Link to={`/friends/${user._id}`}>
                            {user.friends?.length} friends
                          </Link>
                        </div>
                        <div className="">
                          <span style={{ fontWeight: 700 }}>Followers:</span>{' '}
                          <Link to={`/followers/${profileId}`}>
                            {user.followers?.length} followers
                          </Link>
                        </div>
                        <div className="">
                          <span style={{ fontWeight: 700 }}>Following:</span>{' '}
                          <Link to={`/following/${user._id}`}>
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
                      {!isLoading &&
                        posts &&
                        posts.map((post) => (
                          <Post key={post._id} post={post} />
                        ))}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={4}>
              <div className="search-user">
                <div className="search-wrapper">
                  <form className="search-form">
                    <div className="form-group" style={{ marginBottom: '0' }}>
                      <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="name or email"
                        style={{ fontSize: '12px' }}
                      />
                      <button type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
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
                <AvatarGroup
                  max={4}
                  total={user.following?.length}
                  sx={{ justifyContent: 'flex-end' }}
                >
                  {user.following?.map((following) => (
                    <Avatar
                      key={following._id}
                      alt={following.name}
                      src={`http://127.0.0.1:3000${following.photo}`}
                    />
                  ))}
                </AvatarGroup>
              </div>
              {user.request_pending?.length > 0 && currentUser === profileId ? (
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
                        src={`http://127.0.0.1:3000${profile.photo}`}
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
                  {!isLoading &&
                    reading.map((data) => (
                      <CurrentlyReading
                        key={data.book._id}
                        book={data}
                        currentUser={currentUser === profileId ? true : false}
                      />
                    ))}
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
