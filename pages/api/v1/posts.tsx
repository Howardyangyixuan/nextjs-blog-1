import {deletePost, getPost, getPosts, savePost} from 'lib/posts';
import {Post} from '../../../src/entity/Post';
import withSession, {NextIronHandler, NextIronRequest} from '../../../lib/withSession';
import {NextApiResponse} from 'next';

function isLoggedIn(req: NextIronRequest, res: NextApiResponse) {
  const user = req.session.get('currentUser');
  if (!user) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({errors: '尚未登录'}));
    res.end();
    return false;
  }
  return true;
}

const Posts: NextIronHandler = withSession(async (req, res) => {
    if (req.method === 'POST') {
      const {title, content} = req.body;
      if (!isLoggedIn(req, res)) return;
      const user = req.session.get('currentUser');
      const post = new Post(user, title, content);
      const newPost = await savePost(post);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(newPost));
    } else if (req.method === 'GET') {
      res.statusCode = 200;
      let content = await getPosts();
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(content));
    } else if (req.method === 'PATCH') {
      if (!isLoggedIn(req, res)) return;
      const {title, content, id} = req.body;
      const post = await getPost(id);
      post.title = title;
      post.content = content;
      await savePost(post);
      res.json(post);
    } else if (req.method === 'DELETE') {
      if (!isLoggedIn(req, res)) return;
      const {id} = req.query;
      let result;
      if (typeof id === 'string') result = await deletePost(id);
      else result = await deletePost(id[0]);
      res.statusCode = result.affected >= 0 ? 200 : 400;
      res.end();
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end('method不匹配');
    }
  })
;
export default Posts;

