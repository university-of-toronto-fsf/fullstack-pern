import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SignInComponent from '../../components/signin/index.tsx';

// filepath: /Users/mac/projects-2023/uoft/software-dev-v7/project-02/fullstack-pern/client/src/pages/login/index.tsx

const LoginPageComponent: React.FC = () => {
  return (
    <>
      <Container fluid className="d-flex vh-100 p-3">
        <Row className="justify-content-center align-self-center w-100">
          <Col xs={12} md={8} lg={12}>
            <SignInComponent />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPageComponent;
