import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Container, Row, Col } from 'react-bootstrap';
import FormInput from '../Components/Form/FormInput';
import Button from '../Components/Btn/Button';
import ErrorMessage from '../Components/Error/ErrorMessage';
import { useState } from 'react';

const SignIn = () => {
  const [data, setData] = useState();
  const cookie = new Cookies();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const res = await fetch(
      'https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/users/login',
      {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.status === 401) {
      return res;
    }
    const data = await res.json();
    setData(data);
    const token = data.token;
    const userId = data.data.user._id;

    if (token && userId) {
      cookie.set('token', token, {
        path: '/',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      cookie.set('userId', userId, {
        path: '/',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }
    navigate(`/profile/${userId}`);
  };
  return (
    <section>
      <Container>
        <Row className="justify-content-center">
          <Col md={3}>
            <div className="auth-wrapper">
              <div className="auth-top text-center mb-3">
                <div className="logo mb-3">
                  <img
                    src="/images/bibliophileHub.png"
                    alt="bibliophile hub logo"
                  />
                </div>
                {data?.status === 'fail' && (
                  <ErrorMessage message={data.message} />
                )}
                <h1>Sign in</h1>
              </div>
              <form method="post" onSubmit={handleSubmit}>
                <div className="form-group">
                  <FormInput
                    fieldName="Email"
                    type="email"
                    name="email"
                    id="email"
                    rounded={true}
                  />
                </div>
                <div className="form-group">
                  <FormInput
                    fieldName="Password"
                    type="password"
                    name="password"
                    id="password"
                    rounded={true}
                  />
                </div>
                <div
                  className="form-group"
                  style={{ textAlign: 'right', margin: '0' }}
                >
                  <Link to="/forgot-password">Forgot your password?</Link>
                </div>
                <Button
                  text="Submit"
                  type="submit"
                  variant="solid"
                  rounded={true}
                  sx={{ width: '100%', marginTop: '10px' }}
                />
              </form>
              <small className="d-block mt-3">
                By signing in, you agree to the Bibliophile Hub{' '}
                <Link to="/">Terms of Service</Link> and{' '}
                <Link to="/">Privacy Policy</Link>
              </small>
              <div className="mt-4 text-center">
                Create an account <Link to="/signup">Sign up</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignIn;
