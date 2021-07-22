import withSession from '../../../lib/withSession';
import {SignInUser} from '../../../class/SignInUser';

export default withSession(async (req, res) => {
  const {username, password} = req.body;
  let user = new SignInUser(username, password);
  await user.validate();
  if (user.hasError()) {
    res.statusCode = 422;
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.write(JSON.stringify(user.errors));
    res.end();
  } else {
    req.session.set('currentUser',user)
    await req.session.save()
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.write(JSON.stringify(user));
    res.end();
  }
});
