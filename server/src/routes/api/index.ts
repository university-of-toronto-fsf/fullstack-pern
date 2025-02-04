// 3. set up the /api route to process /api/users endpoint requests

// 3(a). import the express Router
import { Router } from 'express';
// 3(b). import the routes file used to process user related requests
import { userRouter } from './user-routes.js'; // note here we refer to the transpiled file

// 3(c). create a new Router Object
const apiRouter = Router();
apiRouter.use('/users', userRouter);

export default apiRouter;
