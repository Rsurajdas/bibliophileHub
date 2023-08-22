import { Form, useActionData, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import FormInput from '../Components/Form/FormInput';
import Button from '../Components/Btn/Button';
import ErrorMessage from '../Components/Error/ErrorMessage';

const SignIn = () => {
  const data = useActionData();
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
                {data && <ErrorMessage message={data.message} />}
                <h1>Sign in</h1>
              </div>
              <Form method="POST">
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
              </Form>
              <small className="d-block mt-3">
                By signing in, you agree to the Bibliophile Hub{' '}
                <Link to="/">Terms of Service</Link> and{' '}
                <Link to="/">Privacy Policy</Link>
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignIn;
