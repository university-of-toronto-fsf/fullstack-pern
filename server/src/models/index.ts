'use strict';

type Env = 'development' | 'test' | 'production';
import fs from 'fs';
import path from 'path';
import { Sequelize, Model, ModelStatic, DataTypes, Dialect } from 'sequelize';
import process from 'process';
// const process = require('process');
import Config from './interfaces/ConfigInterface';
import configData from '../config/config.json';
// import { env } from 'node:process';

const basename = path.basename(__filename);
const env: Env = (process.env.NODE_ENV as Env) || 'development';
// const config = require(__dirname + '/../config/config.json')[env];

const config: Config = {
  ...configData[env],
  dialect: configData[env].dialect as Dialect,
}; // Type assertion
const db: { [key: string]: ModelStatic<Model<any, any>> } & {
  sequelize?: Sequelize;
} = {}; // Explicit db typing

let sequelize: Sequelize;

if (config.use_env_variable) {
  if (
    typeof process.env[config.use_env_variable] === 'string' &&
    typeof config.use_env_variable === 'string'
  ) {
    const envVariable = process.env[config.use_env_variable];
    if (typeof envVariable === 'string') {
      sequelize = new Sequelize(envVariable, config as any);
    } else {
      throw new Error(
        `Environment variable ${config.use_env_variable} is not set or not a string`
      );
    }
  } else {
    throw new Error(
      `Environment variable ${config.use_env_variable} is not set or not a string`
    );
  }
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password as any,
    config as any
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    (db[modelName] as any).associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
