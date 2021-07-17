import {getDatabaseConnection} from './getDatabaseConnection';
import {User} from '../custom';

export const addUser = async (user: User) => {
  const connection = await getDatabaseConnection();
  let users = await connection.manager.insert('users', user);
  console.log(users);
};
export const findUser = async (username: string) => {
  const connection = await getDatabaseConnection();
  let users = await connection.manager.find('User', {username});
  return users[0]
};
