import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {Post} from './entity/Post';

createConnection().then(async connection => {

  let posts = await connection.manager.find(Post);
  if(posts.length===0){
    console.log(posts);
    const p = new Post( 'Post 1',  '第一篇文章')
    await connection.manager.save(p);

    let posts2 = await connection.manager.find(Post);
    console.log(posts2);
  }else{
    await connection.manager.clear(Post)
  }
  await connection.close();
}).catch(error => console.log(error));
