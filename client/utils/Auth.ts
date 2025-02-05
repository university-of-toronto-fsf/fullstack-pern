/**
 * This file defines the `AuthService` class, which provides methods
 * for the client side portion of the application to help
 * for authenticating users in an application.
 * The authentication process is based on JSON Web Tokens (JWT).
 *
 * The `AuthService` class includes methods for:
 * - checking if a user is logged in.
 * - Verifying the validity of provided JWT tokens.
 * - Extracting user information from JWT tokens.
 *
 * These methods ensure that only authenticated users can access certain parts of the application,
 * enhancing the security of the application by preventing unauthorized access.
 */

// Importing specific types and functions from the 'jwt-decode' library.
// JwtPayload: A type definition representing the structure of a JSON Web Token payload.
// jwtDecode: A function used to decode a JSON Web Token (JWT) and extract its payload.
import { type JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    /* 
        // Decodes the JSON Web Token (JWT) using the jwtDecode function, 
        // specifying the expected payload type as UserData.
        // The getToken() method found in this class is called to retrieve the JWT, 
        // which is then passed to jwtDecode to extract and return its payload.
    */
    return jwtDecode<UserData>(this.getToken());
    return false;
  }

  getToken(): string {
    /*
        // This method retrieves the JWT token from client-side local storage.
        // The token is stored in local storage when a user logs in.
        // If the token is not found, an empty string is returned.
        // The token is then used to authenticate requests to protected routes.
        // a server-side equivalent method may involve storing the token in a "session" object.
    */
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  isLoggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  isTokenExpired(token: string): boolean {
    try {
      // Attempt to decode the provided token using jwtDecode, expecting a JwtPayload type.
      const decoded = jwtDecode<JwtPayload>(token);

      // Check if the decoded token has an 'exp' (expiration) property and if it is less than the current time in seconds.
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        // If the token is expired, return true indicating that it is expired.
        return true;
      }
    } catch (err) {
      console.log(err);
      // If decoding fails (e.g., due to an invalid token format), catch the error and return false.
      return false;
    }
    return false;
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }

  testMiddlewareFunction() {
    console.log('This is a test middleware function');
  }
}

// Exporting an instance of the AuthService class, makes it available
// for use in other parts of the application.
export default new AuthService();
