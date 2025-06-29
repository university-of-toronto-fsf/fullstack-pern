import { Request, Response } from 'express';

// TODO: create the connection to the database and import the User model
// import sequelize from '../config/connection';
// import { User } from '../models/User';

// as all requests are now being checked by the verifyJWT middleware function,
// we can assume that the user is authenticated and authorized to access these routes

class TestUserController {
  private debugInfo(req: Request): void {
    console.log('req.url', req.url);
    console.log('req.body', req.body);
  }

  // fun little method for testing purposes that returns a random name
  private async generateRandomName(): Promise<string> {
    try {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch('https://randomuser.me/api/', {
        signal: controller.signal,
        headers: {
          'User-Agent': 'PERN-App/1.0.0'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validate response structure
      if (!data?.results?.[0]?.name?.first || !data?.results?.[0]?.name?.last) {
        throw new Error('Invalid API response structure');
      }
      
      console.log('data', data.results[0].name);
      const name = `${data.results[0].name.first} ${data.results[0].name.last}`;
      return name;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('Request timed out:', error);
      } else {
        console.error('Failed to fetch random name:', error);
      }
      return 'John Doe';
    }
  }

  // Get all users
  // TODO: replace the sample code with the actual DB operation
  // /api/users/getUsers
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    console.log('getAllUsers endpoint');
    this.debugInfo(req);
    /*
        // perform the required DB operation
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users' });
        }
*/

    let result = await this.generateRandomName();
    console.log('sample result', result);
    res
      .status(200)
      .json([
        { name: await this.generateRandomName() },
        { name: await this.generateRandomName() },
        { name: await this.generateRandomName() },
      ]);
  }

  // Get user by ID
  // /api/users/getUserById/:id
  public async getUserById(req: Request, res: Response): Promise<void> {
    console.log('getUserById endpoint');
    this.debugInfo(req);

    // for testing purposes only, generate a random name and return the same ID
    res
      .status(200)
      .json({ name: await this.generateRandomName(), id: req.params.id });
    /*
    // perform the required DB operation
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
*/
  }

  // Update user by ID
  public async updateUserById(req: Request, res: Response): Promise<void> {
    console.log('updateUserById endpoint');
    this.debugInfo(req);

    // for testing purposes only, generate a random name and return the same ID
    const originalName =
      req.body.name.toString().trim().length > 0 ? req.body.name : 'John Doe';
    const randomName = await this.generateRandomName();
    res.status(200).json({ originalName, randomName, id: req.params.id });
    /* 
    try {
    // perform the required DB operation
      const [updated] = await User.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedUser = await User.findByPk(req.params.id);
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
*/
  }

  // Delete user by ID
  public async deleteUserById(req: Request, res: Response): Promise<void> {
    console.log('deleteUserById endpoint');
    this.debugInfo(req);
    const userId =
      req.params.id && !isNaN(Number(req.params.id))
        ? req.params.id
        : Math.floor(Math.random() * 1000);

    // for testing purposes only, return the same ID
    res.status(200).json({
      message: `User with ID ${userId} has been successfully deleted.`,
    });
    /*
    try {
    // perform the required DB operation
      const deleted = await User.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
*/
  }
}

export default new TestUserController();
