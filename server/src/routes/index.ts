// 2. Set Up a Router
import { Router } from 'express'; // Import the express Router
const router = Router(); // Create a new Router

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
