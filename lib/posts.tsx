import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import path from 'path';
import {promises as fsPromise} from 'fs';
import * as fs from 'fs';
import matter from 'gray-matter';
import {getDatabaseConnection} from './getDatabaseConnection';
import {Post} from '../src/entity/Post';

export const getPosts: () => Promise<{ date: string; id: string; title: string }[]> = async () => {
  const connection = await getDatabaseConnection();

  let posts = await connection.manager.find('posts');
  // console.log(posts);
  return JSON.parse(JSON.stringify((posts)));
};

export const getPost: (id: number) => Promise<{ date: string; id: string; title: string }> = async (id: number) => {
  const connection = await getDatabaseConnection();
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
  let posts:Post[]= await connection.manager.find('posts');
  let ids = posts.map(post => post.id.toString());
  console.log(ids);
  return ids;
};
