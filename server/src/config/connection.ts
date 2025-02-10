import dotenv from 'dotenv';
dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL); // Check if DB_URL is actually loaded
console.log('LOCAL_DB_PASSWORD:', process.env.LOCAL_DB_PASSWORD); // Check if local password is loaded

import { Sequelize } from 'sequelize';

/*
  // make sure you have the .env file with the DB_URL
  // variable filled in with the connection string
  // provided by render.com when you create a new database
  // and add the setting to the environment variables
  // in the render.com dashboard
*/
const isUsingRemoteDB: boolean = Boolean(process.env.DATABASE_URL);

/*
  // as discussed in class, I substituted the original code
  // that checks for the presence of the DB_URL variable
  // with a variable that is set to true or false based on
  // the presence of the DB_URL variable
*/

const sequelize: Sequelize = isUsingRemoteDB
  ? new Sequelize(process.env.DATABASE_URL as string, {
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
      process.env.LOCAL_DB_NAME as string,
      process.env.LOCAL_DB_USER as string,
      process.env.LOCAL_DB_PASSWORD as string,
      {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

// Function to check and log the connection
async function checkConnection(): Promise<void> {
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
