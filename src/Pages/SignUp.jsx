import { Form, Link, useActionData } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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
                <h1>Create Account</h1>
              </div>
              <Form method="POST">
                <div className="form-group">
                  <FormInput
                    fieldName="Your name"
                    type="text"
                    name="name"
                    id="name"
                    rounded={true}
                  />
                </div>
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
                  <FormControl>
                    <FormLabel id="role" sx={{ color: '#2a2a2a' }}>
                      Role
                    </FormLabel>
                    <RadioGroup row aria-labelledby="role" name="role">
                      <FormControlLabel
                        value="user"
                        control={
                          <Radio
                            sx={{
                              color: '#124512',
                              '&.Mui-checked': {
                                color: '#124512',
                              },
                            }}
                          />
                        }
                        label="User"
                      />
                      <FormControlLabel
                        value="author"
                        control={
                          <Radio
                            sx={{
                              color: '#124512',
                              '&.Mui-checked': {
                                color: '#124512',
                              },
                            }}
                          />
                        }
                        label="Author"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="form-group">
                  <FormInput
                    fieldName="Password"
                    type="password"
                    name="password"
                    id="password"
                    rounded={true}
                    message={data?.message}
                  />
                </div>
                <div className="form-group">
                  <FormInput
                    fieldName="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
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
              <small className="d-block mt-3">
                By creating an account, you agree to the Bibliophile Hub{' '}
                <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>
              </small>
              <div className="mt-4 text-center">
                Already have an account? <Link to="/signin">Sign in</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignIn;
