import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {addUser} from 'lib/users';
import {SignUpUser} from '../../class/SignUpUser';
import {User} from '../../../src/entity/User';

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
    const {username, password, passwordConfirmation} = req.body;
    const user = new SignUpUser(username, password, passwordConfirmation);
    await user.validate();
    if (user.hasError()) {
      //无法接受的实体
      res.statusCode = 422;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(user.errors));
      res.end();
    } else {
      //TODO: 仅使用md5哈希，需要添加加密方式
      console.log('-----------');
      user.generatePasswordDigest();
      return addUser(user).then(
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
