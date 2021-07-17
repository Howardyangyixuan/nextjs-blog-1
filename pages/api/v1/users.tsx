import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {addUser} from 'lib/users';
import {SignUpUser, SignUpErrors} from '../../../custom';
import md5 from 'md5';

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
    const signUpUser: SignUpUser = req.body;
    const {username, password, passwordConfirmation} = signUpUser;
    //收集错误信息
    const errors: SignUpErrors = {
      username: [],
      password: [],
      passwordConfirmation: []
    };
    //用户名错误
    let cleanUsername = username.trim();
    if (cleanUsername === '') errors.username.push('用户名不能为空');
    if (cleanUsername.length > 10 || cleanUsername.length < 3) errors.username.push('用户名长度要求3-10个字符');
    if (!/^\w*$/.test(username)) errors.username.push('用户名只允许出现数字、英文字母和下划线');
    //密码错误
    if (password == '') errors.password.push('密码不能为空');
    //密码确认错误
    if (password !== passwordConfirmation) errors.passwordConfirmation.push('两次密码不一致');
    //存在错误
    const hasError = Object.values(errors).find(error => error.length > 0);
    if (hasError) {
      //无法接受的实体
      res.statusCode = 422;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(errors));
      res.end();
    } else {
      //TODO: 仅使用md5哈希，需要添加加密方式
      let passwordDigest = md5(password);
      let user = {username, passwordDigest};
      return addUser(user).then(
        () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify(user));
          res.end();
        },
        (error) => {
          //数据库校验，兜底
          errors.username.push(error.message);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify(errors));
          res.end();
        }
      );
    }
  }
;
export default Users;
