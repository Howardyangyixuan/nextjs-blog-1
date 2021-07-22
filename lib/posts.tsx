import {getDatabaseConnection} from './getDatabaseConnection';
import {Post} from '../src/entity/Post';

type Posts = {
  page: number,
  posts: Post[],
  cnt: number
}
export const getPosts: (page?: number, perPage?: number) => Promise<Posts> = async (page = 1, perPage = 5) => {
  const connection = await getDatabaseConnection();
  if (page < 0) page = 1;
  let [posts, cnt] = await connection.manager.findAndCount('posts', {skip: (page - 1) * perPage, take: perPage});
  if (((page - 1) * perPage) >= cnt) {
    page = Math.ceil(cnt / perPage);
    [posts, cnt] = await connection.manager.findAndCount('posts', {skip: (page - 1) * perPage, take: perPage});
  }
  return JSON.parse(JSON.stringify({page, posts, cnt}));
};

export const getPost: (id: number) => Promise<Post> = async (id: number) => {
  const connection = await getDatabaseConnection();
  const post = await connection.getRepository('posts')
    .createQueryBuilder('post')
    .where('post.id = :id', {id})
    .getOne();
  console.log(post);
  return JSON.parse(JSON.stringify(post));
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
