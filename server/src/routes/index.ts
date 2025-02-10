// 2. Set Up a Router
import { Router } from 'express'; // Import the express Router
const router = Router(); // Create a new Router Object

// 2(a). create separate files that will handle the /api and /auth routes
// and import the routes
import apiRouter from './api/index.js';
import authRouter from './auth/index.js';
import testRouter from './test/index.js';

// 2(b). define test routes
/* redefine and refactor these routes below
router.get('/api', (req, res) => {
  console.log('Hello World!');
  console.log('req.url', req.url);
  res.json({ message: 'Hello World!' });
});

router.get('/auth', (req, res) => {
  console.log('Hello auth endpoint!');
  console.log('req.url', req.url);
  res.json({ message: 'Hello auth endpoint' });
});
*/

// 2(b) refactored routes
router.use('/api', apiRouter);
router.use('/auth', authRouter);
router.use('/db-test', testRouter);

export default router;
