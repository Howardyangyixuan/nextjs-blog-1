import {NextApiHandler} from 'next';
import path from "path";
import {promises as fsPromise} from "fs";

export const getPosts:NextApiHandler = async (req, res) => {
  const currentDir = path.join(process.cwd(), 'markdown');
  console.log(currentDir);
  return await fsPromise.readdir(currentDir)
};