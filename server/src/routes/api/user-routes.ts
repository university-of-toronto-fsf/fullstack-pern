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
import TestUserController from '../../controllers/TestUserController.js';

const router = express.Router();

// example test endpoint /api/users
router.get('/', async (req: Request, res: Response): Promise<void> => {
  console.log('Hello user endpoint!');
  console.log('req.url', req.url);
  res.status(200).json({ message: 'Hello user endpoint' });
});

// all routes

router.get('/getUsers', (req: Request, res: Response) => {
  TestUserController.getAllUsers(req, res);
});

// example get User by ID endpoint /api/users/getUserById/:id
router.get('/getUser/:id', (req: Request, res: Response) => {
  TestUserController.getUserById(req, res);
});

// example update User by ID endpoint /api/users/updateUser/:id
router.put('/updateUser/:id', (req: Request, res: Response) => {
  TestUserController.updateUserById(req, res);
});

// example delete User by ID endpoint /api/users/deleteUser/:id
router.delete('/deleteUser/:id', (req: Request, res: Response) => {
  TestUserController.deleteUserById(req, res);
});

export { router as userRouter };
