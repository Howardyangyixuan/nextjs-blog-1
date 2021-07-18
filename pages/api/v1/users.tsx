import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {addUser, findUser} from 'lib/users';
import {SignUpUser, SignUpErrors} from '../../../custom';
import md5 from 'md5';
import {User} from '../../class/User';

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
    const signUpUser: SignUpUser = req.body;
    const {username, password, passwordConfirmation} = signUpUser;
    const user = new User(username, password);
    await user.validate(signUpUser);
    if (user.hasError()) {
      //无法接受的实体
      res.statusCode = 422;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(user.errors));
      res.end();
    } else {
      //TODO: 仅使用md5哈希，需要添加加密方式
      let passwordDigest = md5(password);
      let newUser = {username, passwordDigest};
      return addUser(newUser).then(
        () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify(user));
          res.end();
        },
        (error) => {
          //数据库校验，兜底
          user.errors.username.push(error.message);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify(user.errors));
          res.end();
        }
      );
    }
  }
;
export default Users;
