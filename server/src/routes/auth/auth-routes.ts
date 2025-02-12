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

// 5. import express, request, and response from express
import { Router, Request, Response } from 'express';

// import jsonwebtoken
import jwt from 'jsonwebtoken';
// import bcrypt
import bcrypt from 'bcrypt';
// import the User model as created from the Sequelize model
// ../../models/index.js contains a factory function
// that creates and returns an instance of the User model
import { User } from '../../models/index.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  console.log('Hello auth endpoint!');
  console.log('req.url', req.url);
  res.json({ message: 'Hello auth endpoint' });
});

/*
    // Check if there is a user with the provided credentials
    // if the user exists, generate a JWT token and return it in the response
    // if the user does not exist, return an error message or return user to login screen
    // request.body should contain the user's credentials (username and password)
    // use the compare() method from bcrypt to compare the provided password
    // with the hashed password
  */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  // debug info for testing
  console.log('Login endpoint');
  console.log('req.url', req.url);
  console.log('req.body', req.body);

  // Extract username and password from request body
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) {
    res.status(401).json({ message: 'Authentication failed' });
    return;
  }

  // Compare the provided password with the stored hashed password
  const passwordIsValid = await bcrypt.compare(password, user!.password);

  // If password is invalid, send an authentication failed response
  if (!passwordIsValid) {
    res.status(401).json({ message: 'Authentication failed' });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ username: username, userId: user.id }, secretKey, {
    expiresIn: '1h',
  });

  res.status(200).json({
    description: 'login successful',
    token: token,
  });
});

export { router as authRouter };
