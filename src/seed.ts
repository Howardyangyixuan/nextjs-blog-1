import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {Post} from './entity/Post';
import {User} from './entity/User';
import {Comment} from './entity/Comment';

createConnection().then(async connection => {
  let user = await connection.manager.find(User);
  if (user.length === 0) {
    let user1 = new User('howard', '123');
        await connection.manager.save(user1);
    for (let i = 1; i < 12; i++) {
      const post = new Post(user1, `Howard Post ${i}`, `howard的第${i}篇文章`);
      await connection.manager.save(post);
      const comment = new Comment(user1, post, `欢迎关注和转发howard的第${i}篇文章!`);
      await connection.manager.save(comment);
    }
    // console.log(await connection.manager.find(Post));
  }
  await connection.close();
}).catch(error => console.log(error));
