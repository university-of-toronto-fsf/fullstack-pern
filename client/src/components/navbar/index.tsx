import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import {
  Person,
  Gear,
  BoxArrowLeft /* BoxArrowLeft */,
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
// import the necessary css for boostrap icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLocation } from 'react-router-dom';
import { HouseDoor, BoxArrowInRight } from 'react-bootstrap-icons';
import AuthService from '../../utils/auth';

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

/**
 * NavbarComponent is a functional component that renders a navigation bar.
 * It uses React Router's `useLocation` hook to determine the current path and conditionally
 * renders navigation links and icons based on whether the user is on the login page.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */

const NavbarComponent: React.FC = () => {
  // useLocation is a hook from react-router-dom
  // that returns the location object that represents the current URL
  const location = useLocation();

  // check to see if the current path is the login page
  const isLoginPage = location.pathname === '/login';

  function resolveLink(isLoginPage: boolean) {
    if (isLoginPage) {
      if (
        (AuthService.hasToken() && AuthService.isLoggedIn()) ||
        !AuthService.hasToken()
      ) {
        return '/';
      } else if (AuthService.hasToken() && !AuthService.isLoggedIn()) {
        return '/logout';
      }
    } else if (!isLoginPage) {
      if (AuthService.hasToken() && AuthService.isLoggedIn()) {
        return '/logout';
      } else if (!AuthService.hasToken() || !AuthService.isLoggedIn()) {
        return '/login';
      }
    }
    return '#';
  }

  function resolveLinkText(isLoginPage: boolean): React.ReactNode {
    if (isLoginPage) {
      if (
        (AuthService.hasToken() && AuthService.isLoggedIn()) ||
        !AuthService.hasToken()
      ) {
        return 'Home';
      } else {
        return 'Logout';
      }
    } else {
      if (AuthService.hasToken() && AuthService.isLoggedIn()) {
        return 'Logout';
      } else {
        return 'Login';
      }
    }
  }

  function getAuthIcon(): React.ReactNode {
    if (isLoginPage) {
      if (AuthService.hasToken() && AuthService.isLoggedIn()) {
        return <HouseDoor size={20} />;
      } else {
        return <BoxArrowInRight size={20} />;
      }
    } else {
      if (AuthService.hasToken() && AuthService.isLoggedIn()) {
        return <BoxArrowLeft size={20} />;
      } else {
        return <BoxArrowInRight size={20} />;
      }
    }
  }

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

          {
            // This Nav.Link component conditionally sets its destination
            // and displayed icon based on whether the current page is the login page.
            // If the user is on the login page, it shows a "Home" link with a house icon.
            // Otherwise, it shows a "Login" link with a login icon.
          }
          <Nav.Link as={Link} to={resolveLink(isLoginPage)}>
            <span>{resolveLinkText(isLoginPage)} &nbsp;</span>
            {getAuthIcon()}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
