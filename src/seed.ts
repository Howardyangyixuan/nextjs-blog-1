import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {Post} from './entity/Post';

createConnection().then(async connection => {

  let posts = await connection.manager.find(Post);
  if (posts.length === 0) {
    console.log(posts);
    for (let i = 1; i < 12; i++) {
      const p = new Post(i,`Post ${i}`, `第${i}篇文章`);
      await connection.manager.save(p);
    }

    let posts2 = await connection.manager.find(Post);
    console.log(posts2);
  }
  await connection.close();
}).catch(error => console.log(error));
