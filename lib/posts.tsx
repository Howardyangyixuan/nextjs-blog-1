import {getDatabaseConnection} from './getDatabaseConnection';
import {Post} from '../src/entity/Post';
import {DeleteResult} from 'typeorm';

type Posts = {
  page: number,
  posts: Post[],
  cnt: number
}
export const getPosts: (page?: number, perPage?: number) => Promise<Posts> = async (page = 1, perPage = 10) => {
  const connection = await getDatabaseConnection();
  const amount = await connection.manager.count('posts');
  if (page < 0) page = 1;
  if (((page - 1) * perPage) >= amount) {
    page = Math.ceil(amount / perPage);
  }
  let [posts, cnt] = await connection.manager.findAndCount('posts', {
    skip: (page - 1) * perPage, take: perPage, order: {'updatedAt': 'DESC'}
  });
  return JSON.parse(JSON.stringify({page, posts, cnt}));
};

export const getPost: (id: string) => Promise<Post> = async (id) => {
  const connection = await getDatabaseConnection();
  const post = await connection.getRepository('posts')
    .createQueryBuilder('post')
    .where('post.id = :id', {id})
    .getOne();
  return JSON.parse(JSON.stringify(post || null));
};

export const getPostIds: () => Promise<string[]> = async () => {
  const connection = await getDatabaseConnection();
  let posts: Post[] = await connection.manager.find('posts');
  return posts.map(post => post.id.toString());
};
export const savePost: (post: Post) => Promise<Post> = async (post) => {
  const connection = await getDatabaseConnection();
  let newPost = await connection.manager.save('posts', post);
  return JSON.parse(JSON.stringify(newPost));
};

export const deletePost: (id: string) => Promise<DeleteResult> = async (id) => {
  const connection = await getDatabaseConnection();
  const result = await connection.manager.delete('Post', id);
  return JSON.parse(JSON.stringify(result));
};
