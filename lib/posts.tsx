import {getDatabaseConnection} from './getDatabaseConnection';
import {Post} from '../src/entity/Post';

export const getPosts: () => Promise<Post[]> = async () => {
  const connection = await getDatabaseConnection();

  let posts = await connection.manager.find('posts');
  // console.log(posts);
  return JSON.parse(JSON.stringify((posts)));
};

export const getPost: (id: number) => Promise<Post> = async (id: number) => {
  const connection = await getDatabaseConnection();
  //能否通过数据库查询语句优化查找
  // const post = connection.getRepository(Post)
  //   .createQueryBuilder('posts')
  //   .where('post.id = :id', {id})
  //   .getOne();
  // console.log(post);
  let posts = await connection.manager.find('posts');
  // console.log(posts);
  return JSON.parse(JSON.stringify((posts[id - 1])));
};

export const getPostIds: () => Promise<string[]> = async () => {
  const connection = await getDatabaseConnection();
  let posts: Post[] = await connection.manager.find('posts');
  return posts.map(post => post.id.toString());
};
export const savePost: (post: Post) => Promise<Post> = async (post) => {
  const connection = await getDatabaseConnection();
  let newPost = await connection.manager.insert('posts', post);
  return JSON.parse(JSON.stringify(newPost));
};
