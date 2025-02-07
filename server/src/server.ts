// 1. Prepare Baseline Express Server

// 1(a). Import express
import express from 'express';
// added: import path
import path from 'path';

// 1(b). Create an express app instance
const APP = express();

// 1(c). import routes
import routes from './routes/index.js';

// 1(d). require dotenv
import dotenv from 'dotenv';
dotenv.config();

// import the middleware function
import verifyJWT from './routes/middleware/verify-jwt.js';

// 1(f). Define the port number
console.log(`process.env.PORT: ${process.env.PORT}`);
const PORT = process.env.PORT || 3002;

// 1(g). add JSON parsing middleware before the routes are set up
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));

// 1(h). before we define the routes, we need to add the middleware functions
// add the middleware function to the express app
// in this case, the middleware function is verifyJWT which will be used to
// verify the JWT token as this has to happen upon every request to the server
APP.use(verifyJWT);

// Serve static files from the React build folder
const __dirname = path.resolve();
APP.use(express.static(path.join(__dirname, '../client/dist')));

// Use API routes
APP.use('/api', routes); // Ensures API routes don't get overridden by frontend serving

// Catch-all route to serve the React app (for React Router support)
APP.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// 1(g). Define directory for static files and connect routes to express app
// APP.use(express.static('../client/dist')); // replaced by line above
APP.use(routes);

// 1(h). launch the server
APP.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
