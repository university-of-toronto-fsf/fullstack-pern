/* 
// whenever a URI request is made from a user / client,
// the request should be directed to a common "middleware" function
// that will expect a JWT token to be included in the request.
// This middleware function will verify the token and then
// pass the request to the appropriate route handler.

// The function executes "in the middle" or "in between" 
// the request and the route handler.
// both auth-routes.js and user-routes.js will have similar code
*/

// 4. import express, request, and response from express
import express from 'express';
// 5(a). import Request and Response types from express
import { type Request, type Response } from 'express';
// 6. import jsonwebtoken
import jwt from 'jsonwebtoken'; // Import the JSON Web Token library

const router = express.Router();

// example test endpoint /api/users
router.get('/', async (req: Request, res: Response): Promise<void> => {
  console.log('Hello user endpoint!');
  console.log('req.url', req.url);
  res.status(200).json({ message: 'Hello user endpoint' });
});

router.post('/login', async (req: Request, res: Response) => {
  console.log('Login endpoint');
  console.log('req.url', req.url);
  console.log('req.body', req.body);
  /* 
    // insert code here to check if there is a user with the provided credentials
    // if the user exists, generate a JWT token and return it in the response
    // if the user does not exist, return an error message or return user to login screen
    // request.body should contain the user's credentials (username and password)
    // use the compare() method from bcrypt to compare the provided password 
    // with the hashed password
  */

  // for now, we will create a pretend user and return a pretend token for testing
  const pretendUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ username: pretendUser.username }, secretKey, {
    expiresIn: '1h',
  });

  res.json({
    description: 'Login Endpoint',
    token: token,
  });
});

// example test endpoint /api/users/getUsers
const getUsers = async (req: Request, res: Response): Promise<void> => {
  console.log('Get Users endpoint');
  console.log('req.url', req.url);
  console.log('req.body', req.body);

  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';
    if (!secretKey) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error('Error verifying token:', err);
        res.status(403).json({ message: 'Forbidden' });
        return;
      }

      console.log('User:', user);

      // Once the token is validated, return the list of users from the DB
      res.status(200).json({ users: ['Alice', 'Bob', 'Charlie'], user });
    });
  } catch (error) {
    console.error('Error in getUsers endpoint:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

router.get('/getUsers', getUsers);

export { router as userRouter };
