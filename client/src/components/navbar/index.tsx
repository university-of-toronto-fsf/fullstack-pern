import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Person, Gear /* BoxArrowLeft */ } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
// import the necessary css for boostrap icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLocation } from 'react-router-dom';
import { HouseDoor, BoxArrowInRight } from 'react-bootstrap-icons';

/*
 * Navbar component
 * Navbar component contains the navigation bar of the application
 * It contains the logo, search bar, and the user profile, settings, and logout buttons
 */

/*
 * Nav.Link as={Link} to="/profile"
 * This is a react-bootstrap component that is used to
 * create a link in the navigation bar
 * Nav is a react-bootstrap component
 * .Link is a sub-component of Nav used to create links
 * https://react-bootstrap.github.io/docs/components/navbar
 */
const NavbarComponent: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand href="#home">Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Form className="form-inline d-flex">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">
              <i className="bi bi-search"></i>
            </Button>
          </Form>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/profile">
            <span>Account &nbsp;</span>
            <Person size={20} />
          </Nav.Link>
          <Nav.Link as={Link} to="/settings">
            <span>Settings &nbsp;</span>
            <Gear size={20} />
          </Nav.Link>
          <Nav.Link as={Link} to={isLoginPage ? '/' : '/login'}>
            <span>{isLoginPage ? 'Home' : 'Login'} &nbsp;</span>
            {isLoginPage ? (
              <HouseDoor size={20} />
            ) : (
              <BoxArrowInRight size={20} />
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
