import { Request, Response } from 'express';
import { User } from '../models/user';

class TestDBController {
  public async debugInfo(req: Request, res: Response): Promise<void> {
    console.log('req.url', req.url);
    console.log('req.baseUrl', req.baseUrl);
    console.log('req.originalUrl', req.originalUrl);
    console.log('req.method', req.method);
    console.log('res.statusCode', res.statusCode);
    // res.send('Debug info: req, res = ' + req + '\n' + res);
  }

  public async getAllUsers(req: Request, res: Response): Promise<any> {
    await this.debugInfo(req, res);
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
  }

  public async getUserById(req: Request, res: Response): Promise<any> {
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

  public async addUser(req: Request, res: Response): Promise<any> {
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

  public async deleteUser(req: Request, res: Response): Promise<any> {
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

  public async updateUser(req: Request, res: Response): Promise<any> {
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
}

export default new TestDBController();
