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

// import the middleware function
import verifyJWT from './routes/middleware/verify-jwt.js';

// Import sequelize for graceful shutdown
import sequelize from './config/connection.js';

// 1(f). Define the port number
console.log(`process.env.PORT: ${process.env.PORT}`);
const PORT = process.env.PORT || 3002;

// 1(g). add JSON parsing middleware before the routes are set up
APP.use(express.json({ limit: '10mb' })); // Add size limit to prevent memory attacks
APP.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 1(h). before we define the routes, we need to add the middleware functions
// add the middleware function to the express app
// in this case, the middleware function is verifyJWT which will be used to
// verify the JWT token as this has to happen upon every request to the server
APP.use(verifyJWT);

// 1(g). Define directory for static files and connect routes to express app
APP.use(express.static('../client/dist'));
APP.use(routes);

// 1(h). launch the server
const server = APP.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Set server timeout to prevent hanging connections
server.timeout = 30000; // 30 seconds
server.keepAliveTimeout = 5000; // 5 seconds
server.headersTimeout = 6000; // 6 seconds (should be higher than keepAliveTimeout)

// Graceful shutdown handling to prevent memory leaks
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);
  
  // Close HTTP server
  server.close(async () => {
    console.log('HTTP server closed.');
    
    try {
      // Close database connections
      await sequelize.close();
      console.log('Database connections closed.');
      
      process.exit(0);
    } catch (error) {
      console.error('Error during graceful shutdown:', error);
      process.exit(1);
    }
  });
  
  // Force shutdown after timeout
  setTimeout(() => {
    console.error('Forced shutdown due to timeout');
    process.exit(1);
  }, 10000); // 10 seconds timeout
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});
