import { Container, Row, Col } from 'react-bootstrap';
import Title from '../Components/UI/Title';
import { useRef, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import SearchProfileList from '../Components/Profile/SearchProfileList';

const AddFriend = () => {
  const [member, setMember] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchRef = useRef(null);
  const token = useRouteLoaderData('token');

  const fetchMember = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/search-member?query=${searchRef.current.value}`,
        {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setIsLoading(false);
      setMember(data.data.users);
    } catch (err) {
      console.error(err.message);
    }
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
                        <form className="search-form" onSubmit={fetchMember}>
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
                    <ul className="mt-4">
                      {!isLoading &&
                        member.map((profile) => (
                          <SearchProfileList
                            key={profile._id}
                            profile={profile}
                          />
                        ))}
                    </ul>
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
