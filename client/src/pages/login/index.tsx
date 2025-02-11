import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarComponent from '../../components/navbar/index.tsx';
import SignInComponent from '../../components/signin/index.tsx';

// filepath: /Users/mac/projects-2023/uoft/software-dev-v7/project-02/fullstack-pern/client/src/pages/login/index.tsx

const LoginPage: React.FC = () => {
  return (
    <>
      <NavbarComponent />
      <Container fluid className="d-flex vh-100">
        <Row className="justify-content-center align-self-center w-100">
          <Col xs={12} md={6} lg={4}>
            <SignInComponent />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
