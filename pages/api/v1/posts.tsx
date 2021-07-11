import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {getPosts} from 'lib/posts';

const Posts = async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  let content = await getPosts(req, res);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(content));
};
export default Posts;

