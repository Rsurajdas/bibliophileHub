import { Container, Row, Col } from 'react-bootstrap';
import Title from '../Components/UI/Title';
import { useRef } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import SearchProfileList from '../Components/Profile/SearchProfileList';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen';
import { Empty } from 'antd';

const AddFriend = () => {
  const searchRef = useRef(null);
  const token = useRouteLoaderData('token');

  const {
    data: members,
    isFetching,
    refetch: fetchMember,
  } = useQuery({
    queryKey: ['search-member', token],
    queryFn: () => {
      return axios.get(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/search-member?query=${searchRef.current.value}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
    },
    select: (data) => data.data.data.users,
    enabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMember();
  };

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
                    <div className="search-user">
                      <div className="search-wrapper">
                        <form className="search-form" onSubmit={handleSubmit}>
                          <div
                            className="form-group"
                            style={{ marginBottom: '0' }}
                          >
                            <input
                              type="search"
                              name="search"
                              id="search"
                              placeholder="name or email"
                              style={{ fontSize: '12px' }}
                              ref={searchRef}
                            />
                            <button type="submit">
                              <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    {isFetching ? (
                      <LoadingScreen />
                    ) : (
                      <ul className="mt-4">
                        {!members?.length ? (
                          <Empty />
                        ) : (
                          members?.map((profile) => (
                            <SearchProfileList
                              key={profile._id}
                              profile={profile}
                            />
                          ))
                        )}
                      </ul>
                    )}
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

export default AddFriend;
