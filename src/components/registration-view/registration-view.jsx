import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send request to the server for authentication */

      axios.post('https://myflixapi-0196.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please login!');
          window.open('/', '_self');
        })
        .catch(response => {
          console.error(response);
          alert('Unable to register');
        });
    }
  };


  return (


    <Container className="registerContainer" >


      <Row>
        <Col>
          <CardGroup>
            <Card className="registerCard">
              <Card.Body>
                <Card.Title className="text-center">Welcome to myFlix!</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">Register here!</Card.Subtitle>

                <Form>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="*required field"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="*required field"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="*required field"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      className="mb-3"
                      type="date"
                      value={Birthday}
                      onChange={e => setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    className="registerButton"
                    variant="dark" size="lg" type="submit"
                    onClick={handleSubmit}>Register
                  </Button>

                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func,
};