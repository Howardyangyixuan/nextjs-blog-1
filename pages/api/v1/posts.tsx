import {getPosts, savePost} from 'lib/posts';
import {Post} from '../../../src/entity/Post';
import withSession, {NextIronHandler} from '../../../lib/withSession';

const Posts: NextIronHandler = withSession(async (req, res) => {
  console.log(req.method);
  if (req.method === 'POST') {
    const {title, content} = req.body;
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
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end('method不匹配');
  }
});
export default Posts;

