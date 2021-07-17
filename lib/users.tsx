import {getDatabaseConnection} from './getDatabaseConnection';
import {User} from '../custom';

export const addUser = async (user: User) => {
  const connection = await getDatabaseConnection();
  let users = await connection.manager.insert('users', user);
  console.log(users);
  // console.log(posts);
};
