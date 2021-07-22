import {SignUpErrors} from '../custom';
import {User} from '../src/entity/User';
import {findUser} from '../lib/users';

export class SignUpUser extends User {

  passwordConfirmation: string;

  constructor(username: string, password: string, passwordConfirmation: string) {
    super(username, password);
    this.passwordConfirmation = passwordConfirmation;
  }

  //收集错误信息
  errors: SignUpErrors = {
    username: [],
    password: [],
    passwordConfirmation: []
  };

  hasError() {
    //存在错误
    return Object.values(this.errors).find(error => error.length > 0);
  }

  async validate() {
    //1. 用户名错误
    let cleanUsername = this.username.trim();
    console.log(cleanUsername);
    let existUser = await findUser(cleanUsername);
    if (cleanUsername === '') this.errors.username.push('用户名不能为空');
    if (cleanUsername.length > 10 || cleanUsername.length < 3) this.errors.username.push('用户名长度要求3-10个字符');
    if (existUser) {
      this.errors.username.push('该用户名已存在');
    }
    if (!/^\w*$/.test(this.username)) this.errors.username.push('用户名只允许出现数字、英文字母和下划线');
    //2. 密码错误
    if (this.password == '') this.errors.password.push('密码不能为空');
    //3. 密码确认错误
    if (this.password !== this.passwordConfirmation) this.errors.passwordConfirmation.push('两次密码不一致');
  }
}
