import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../utils/auth';

const SignOutComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    AuthService.clearToken();
    navigate('/');
  };

  return (
    <Modal show={true} onHide={handleSignOut}>
      <Modal.Header closeButton>
        <Modal.Title>Logging you out...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You are being logged out. Please click OK to continue.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSignOut}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignOutComponent;
