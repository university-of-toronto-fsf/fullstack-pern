import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FaGoogle, FaMicrosoft, FaFacebook } from 'react-icons/fa';

const SignIn: React.FC = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Login</h2>
          <Form>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
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
  );
};

export default SignIn; // </Row>
