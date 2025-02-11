// 3(a). import the express Router
import { Router } from 'express';
import { type Request, type Response } from 'express';
import TestDBController from '../../controllers/TestDBController.js';

const testRouter = Router();

// create a test route for the test access to DB
// the main url for this route would be /test/

// '/' gets all users
testRouter.get('/', async (req: Request, res: Response): Promise<any> => {
  console.log('Hello from test DB route get all users!');
  TestDBController.getAllUsers(req, res);
});

// '/get-user/:id' gets a user by id
testRouter.get(
  '/get-user/:id',
  async (req: Request, res: Response): Promise<any> => {
    TestDBController.getUserById(req, res);
  }
);

// '/add-user' adds a new user
testRouter.post(
  '/add-user',
  async (req: Request, res: Response): Promise<any> => {
    TestDBController.addUser(req, res);
  }
);

// '/delete-user/:id' deletes a user
testRouter.delete(
  '/delete-user/:id',
  async (req: Request, res: Response): Promise<any> => {
    TestDBController.deleteUser(req, res);
  }
);

// '/update-user/:id' updates a user
testRouter.put(
  '/update-user/:id',
  async (req: Request, res: Response): Promise<any> => {
    TestDBController.updateUser(req, res);
  }
);

export default testRouter;
