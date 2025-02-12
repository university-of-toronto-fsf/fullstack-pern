import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FaGoogle, FaMicrosoft, FaFacebook } from 'react-icons/fa';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import AuthService from '../../utils/auth';
import { useEffect } from 'react';

const SignIn: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AuthService.isLoggedIn();
      if (token) {
        setModalMessage('You are already logged in. Do you wish to logout?');
        setShowModal(true);
      }
    };

    checkLoginStatus();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setUsernameError(false);
    setPasswordError(false);

    if (!username || !password) {
      if (!username) {
        setUsernameError(true);
        setModalMessage('Username cannot be blank');
      }
      if (!password) {
        setPasswordError(true);
        setModalMessage('Password cannot be blank');
      }
      setShowModal(true);
    } else {
      // Handle form submission
      const isLoggedIn = AuthService.isLoggedIn();
      console.log(`isLoggedIn: ${isLoggedIn}`);
      if (isLoggedIn) {
        setModalMessage('You are already logged in. Do you wish to logout?');
        setShowModal(true);
      } else {
        console.log('Logging in...');
        AuthService.login(username, password);
        // confirm token created, and proceed to home page
        if (isLoggedIn) {
          window.location.href = '/';
        }
      }
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isInvalid={usernameError}
                />
                <Form.Control.Feedback type="invalid">
                  Username cannot be blank
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={passwordError}
                />
                <Form.Control.Feedback type="invalid">
                  Password cannot be blank
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-between mb-3">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button variant="secondary" type="reset">
                  Reset
                </Button>
              </div>

              <div className="text-center">
                <Button variant="outline-danger" className="me-2" disabled>
                  <FaGoogle /> Login with Google
                </Button>
                <Button variant="outline-primary" className="me-2" disabled>
                  <FaMicrosoft /> Login with Microsoft
                </Button>
                <Button variant="outline-primary" disabled>
                  <FaFacebook /> Login with Facebook
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignIn; // </Row>
