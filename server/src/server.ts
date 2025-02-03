// 1. Prepare Baseline Express Server

// 1(a). Import express
import express from 'express';
// 1(b). Create an express app instance
const APP = express();
// 1(c). Define the port number
const PORT = process.env || 3001;
// 1(d). Define directory for static files
APP.use(express.static('../client/dist'));
// 1(e). add JSON parsing middleware
APP.use(express.json());
// 1(f). launch the server
APP.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
