// 1. Prepare Baseline Express Server

// 1(a). Import express
import express from 'express';
// 1(b). Create an express app instance
const APP = express();

// 1(c). import routes
import routes from './routes/index.js';

// 1(d). require dotenv
import dotenv from 'dotenv';
dotenv.config();

// 1(e). Define the port number
console.log(`process.env.PORT: ${process.env.PORT}`);
const PORT = process.env.PORT || 3002;

// 1(f). add JSON parsing middleware before the routes are set up
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));

// 1(g). Define directory for static files and connect routes to express app
APP.use(express.static('../client/dist'));
APP.use(routes);

// 1(h). launch the server
APP.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
