import { User } from '../models/index.js';

interface UserAttributes {
  username: string;
  email: string;
  password: string;
}

export const seedUsers = async (): Promise<void> => {
  const users: UserAttributes[] = [
    { username: 'JollyGuru', email: 'jolly@guru.com', password: 'password' },
    {
      username: 'SunnyScribe',
      email: 'sunny@scribe.com',
      password: 'password',
    },
    {
      username: 'RadiantComet',
      email: 'radiant@comet.com',
      password: 'password',
    },
  ];

  await User.bulkCreate(users, { individualHooks: true });
};
