import { Request, Response } from 'express';

class TestDBController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async debugInfo(_req: Request, res: Response): Promise<void> {
    res.send('Debug info');
  }
}

export default new TestDBController();
