import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Avatar, AvatarGroup } from '@mui/material';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getUserData } from '../store/actions/userAction';
import { Link, useRouteLoaderData } from 'react-router-dom';
import Post from '../Components/Post/Post';
import Title from '../Components/UI/Title';
import CurrentlyReading from '../Components/Book/CurrentlyReading';
import './../Components/Nav/Search.css';

const Profile = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reading, setReading] = useState([]);
  const token = useRouteLoaderData('token');

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const { user } = useSelector((state) => state.user, shallowEqual);

  const fetchPosts = async () => {
    const res = await fetch('http://127.0.0.1:3000/api/v1/posts/', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await res.json();
    setIsLoading(false);
    setPosts(data.data.posts);
  };

  const fetchReading = async () => {
    const res = await fetch(
      'http://127.0.0.1:3000/api/v1/shelf/get-currently-reading/books',
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
    fetchReading();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

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
                          <Link to="/friends">
                            {user.friends?.length} friends
                          </Link>
                        </div>
                        <div className="">
                          <span style={{ fontWeight: 700 }}>Followers:</span>{' '}
                          <Link to="/followers">
                            {user.followers?.length} followers
                          </Link>
                        </div>
                        <div className="">
                          <span style={{ fontWeight: 700 }}>Following:</span>{' '}
                          <Link to="/following">
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
                      <CurrentlyReading key={data.book._id} book={data} />
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
