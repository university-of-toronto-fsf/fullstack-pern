// 3. set up the /api route to process /auth/ endpoint requests

// 3(a). import the express Router
import { Router } from 'express';
// 3(b). import the routes file used to process user related requests
import { authRouter } from './auth-routes.js'; // note here we refer to the transpiled file

// 3(c). create a new Router Object
const apiRouter = Router();
apiRouter.use('/users', authRouter);

export default apiRouter;
