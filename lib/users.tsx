import {getDatabaseConnection} from './getDatabaseConnection';
import {User} from '../src/entity/User';

export const addUser = async (user: { password: string; username: string }) => {
  const connection = await getDatabaseConnection();
  let users = await connection.manager.insert('users', user);
  console.log(users);
  // console.log(posts);
};
