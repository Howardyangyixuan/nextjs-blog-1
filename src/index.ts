import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {Post} from './entity/Post';

createConnection().then(async connection => {

  // console.log("Inserting a new user into the database...");
  // const user = new User();
  // user.firstName = "Timber";
  // user.lastName = "Saw";
  // user.age = 25;
  // await connection.manager.save(user);
  // console.log("Saved a new user with id: " + user.id);
  //
  // console.log("Loading users from the database...");
  // const users = await connection.manager.find(User);
  // console.log("Loaded users: ", users);
  //
  // console.log("Here you can setup and run express/koa/any other framework.");
  // console.log(connection);
  let posts = await connection.manager.find(Post);
  console.log(posts);
  const p = new Post();
  p.title = 'Post 1';
  p.content = '第一篇文章';
  await connection.manager.save(p);

  let posts2 = await connection.manager.find(Post);
  console.log(posts2);
  await connection.close();

}).catch(error => console.log(error));
