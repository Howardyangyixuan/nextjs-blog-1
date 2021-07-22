import {getDatabaseConnection} from './getDatabaseConnection';
import {User} from '../src/entity/User';

export const addUser = async (user: User) => {
  const connection = await getDatabaseConnection();
  await connection.manager.insert('users', user);
};
export const findUser = async (username: string) => {
  const connection = await getDatabaseConnection();
  const users = await connection.manager.find('User', {username});
  return users[0] as User;
};
