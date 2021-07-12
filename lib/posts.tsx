import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import path from 'path';
import {promises as fsPromise} from 'fs';
import * as fs from 'fs';
import matter from 'gray-matter';

export const getPosts: (req: NextApiRequest, res: NextApiResponse) => Promise<{ date: string; id: string; title: string }[]> = async (req, res) => {
  const blogDir = path.join(process.cwd(), 'markdown');
  let blogList = await fsPromise.readdir(blogDir);
  console.log(blogList);
  return blogList.map((fileName) => {
    let id = fileName.replace(/\.md$/, '');
    let filePath = path.join(blogDir, fileName);
    console.log(filePath);
    let contentString = fs.readFileSync(filePath, 'utf-8');
    let {data: {title, date}, content} = matter(contentString);
    return {id, title, date};
  });
};