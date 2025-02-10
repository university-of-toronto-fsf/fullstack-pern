// 3(a). import the express Router
import { Router } from 'express';
import { type Request, type Response } from 'express';

import { User } from '../../models/index.js';
import { Op } from 'sequelize';

const testRouter = Router();

// create a test route for the test access to DB
// the main url for this route would be /test/

// '/' gets all users
testRouter.get('/', async (req: Request, res: Response): Promise<any> => {
  console.log('Hello from testDB route!');
  console.log('req.url', req.url);

  try {
    const count = await User.count();
    console.log('count = number of records to return:', count);
    const allUsers = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    if (count === 0) {
      return res.status(200).json({ message: 'No records found' });
    }
    return res.json(allUsers);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// '/get-user/:id' gets a user by id
testRouter.get(
  '/get-user/:id',
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// '/add-user' adds a new user
testRouter.post(
  '/add-user',
  async (req: Request, res: Response): Promise<any> => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const newUser = await User.create({
        username,
        email,
        password,
      });

      return res.status(200).json(newUser);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// '/delete-user/:id' deletes a user
testRouter.delete(
  '/delete-user/:id',
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.destroy();
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// '/update-user/:id' updates a user
testRouter.put(
  '/update-user/:id',
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.username = username;
      user.email = email;
      user.password = password;
      await user.save();

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

export default testRouter;
