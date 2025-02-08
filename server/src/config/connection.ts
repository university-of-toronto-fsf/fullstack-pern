import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

/*
  // make sure you have the .env file with the DB_URL
  // variable filled in with the connection string
  // provided by render.com when you create a new database
  // and add the setting to the environment variables
  // in the render.com dashboard
*/
const isUsingRemoteDB = Boolean(process.env.DB_URL);

/*
  // as discussed in class, I substituted the original code
  // that checks for the presence of the DB_URL variable
  // with a variable that is set to true or false based on
  // the presence of the DB_URL variable
*/

const sequelize = isUsingRemoteDB
  ? new Sequelize(process.env.DB_URL as string, {
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
        ssl: {
          require: true,
          rejectUnauthorized: false,
        } /* 
          here, we are telling the database to accept all SSL certificates
          regardless of their origin (for example from render.com) */,
      },
    })
  : new Sequelize(
      process.env.LOCAL_DB_NAME || '',
      process.env.LOCAL_DB_USER || '',
      process.env.LOCAL_DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

// Function to check and log the connection
async function checkConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    if (isUsingRemoteDB) {
      console.log(`Connected to remote database: ${process.env.DB_URL}`);
    } else {
      console.log(
        `Connected to local database: ${sequelize.config.database} at host ${sequelize.config.host}`
      );
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the function to log connection details
checkConnection();

export default sequelize;
