import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import path from 'path';
import {promises as fsPromise} from 'fs';
import * as fs from 'fs';
import matter from 'gray-matter';
import {getDatabaseConnection} from './getDatabaseConnection';

export const getPosts: () => Promise<{ date: string; id: string; title: string }[]> = async () => {
  const connection = await getDatabaseConnection();
  const blogDir = path.join(process.cwd(), 'markdown');
  let blogList = await fsPromise.readdir(blogDir);
  // console.log(blogList);
  return blogList.map((fileName) => {
    let id = fileName.replace(/\.md$/, '');
    let filePath = path.join(blogDir, fileName);
    // console.log(filePath);
    let contentString = fs.readFileSync(filePath, 'utf-8');
    let {data: {title, date}, content} = matter(contentString);
    return {id, title, date: date.toString()};
  });
};