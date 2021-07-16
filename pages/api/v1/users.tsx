import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {addUser} from 'lib/users';

type SignUpUser = {
  username: string
  password: string
  passwordConfirmation: string
}
const Users = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.body);
  let signUpUser: SignUpUser = req.body;
  //两次密码不一致
  if (signUpUser.password !== signUpUser.passwordConfirmation) {
    const error = {passwordConfirmation: ['两次密码不一致']};
    //无法接受的实体
    res.statusCode = 422;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(error));
    res.end();
  } else {
    let user = {username: signUpUser.username, password: signUpUser.password};
    await addUser(user);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify('添加成功'));
  }
};
export default Users;
