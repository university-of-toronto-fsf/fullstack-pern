// 2. Set Up a Router
import { Router } from 'express'; // Import the express Router
const router = Router(); // Create a new Router Object

// 2(a). create separate files that will handle the /api and /auth routes

// 2(b). define  test routes
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

export default router;
