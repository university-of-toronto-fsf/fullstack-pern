import { Dialect } from 'sequelize';

interface Config {
  username: string;
  password: string | null;
  database: string;
  host: string;
  dialect: Dialect;
  use_env_variable?: string;
}

export default Config;
