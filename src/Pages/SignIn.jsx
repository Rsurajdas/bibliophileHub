import { Form, useActionData } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import FormInput from '../Components/Form/FormInput';
import Button from '../Components/Btn/Button';

const SignIn = () => {
  const data = useActionData();
  return (
    <section>
      {console.log(data)}
      <Container>
        <Row className="justify-content-center">
          <Col md={4}>
            <div className="auth-wrapper">
              <div className="auth-top text-center mb-3">
                <div className="logo mb-3">
                  <img
                    src="/images/bibliophileHub.png"
                    alt="bibliophile hub logo"
                  />
                </div>
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
                <Button
                  text="Submit"
                  type="submit"
                  variant="solid"
                  rounded={true}
                  sx={{ width: '100%', marginTop: '10px' }}
                />
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignIn;
