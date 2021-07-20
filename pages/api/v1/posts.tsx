import {NextApiRequest, NextApiResponse} from 'next';
import {getPosts} from 'lib/posts';

const Posts = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.method);
  if (req.method === 'POST') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end('提交成功');
  } else if (req.method === 'GET') {
    res.statusCode = 200;
    let content = await getPosts();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(content));
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end('method不匹配');
  }
};
export default Posts;

