import session, {NextIronHandler} from '../../../../lib/withSession';
import {deletePost, getPost, savePost} from '../../../../lib/posts';

const Posts: NextIronHandler = session(async (req, res) => {
  if (req.method === 'PATCH') {
    const user = req.session.get('currentUser');
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    const {title, content, id} = req.body;
    const post = await getPost(id);
    post.title = title;
    post.content = content;
    await savePost(post);
    res.json(post);
  }
  if (req.method === 'DELETE') {
    const id = req.query.id.toString();
    const result = await deletePost(id);
    res.statusCode = result.affected >= 0 ? 200 : 400;
    res.end();
  }
});
export default Posts;