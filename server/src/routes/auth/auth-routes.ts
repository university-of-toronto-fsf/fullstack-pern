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
import express from 'express';
// 5(a). import Request and Response types from express
import { type Request, type Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  console.log('Hello auth endpoint!');
  console.log('req.url', req.url);
  res.json({ message: 'Hello auth endpoint' });
});

export { router as authRouter };
