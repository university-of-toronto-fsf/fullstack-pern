import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Invoking verifyJWT middleware function');
  console.log('req.url', req.url);
  console.log('req.body', req.body);

  // if the URL is / and there is no authorization header, skip the JWT verification
  // because the user is not trying to access a protected route
  // its simply the home page.
  if (req.url === '/' && !req.headers['authorization']) {
    next();
    return;
  }

  // if the URL is /api/users/login, skip the JWT verification
  // because the user doesn't have a token yet
  if (req.url === '/auth/login') {
    next();
    return;
  }

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
    next();
  });
};

export default verifyJWT;
