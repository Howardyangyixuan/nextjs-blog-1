import {SignInErrors} from '../../custom';
import {User} from '../../src/entity/User';
import {findUser} from '../../lib/users';

export class SignInUser extends User {

  constructor(username: string, password: string) {
    super(username, password);
  }

  //收集错误信息
  errors: SignInErrors = {
    username: [],
    password: [],
  };

  assign(user: User) {
    this.id = user.id;
    this.updatedAt = user.updatedAt;
    this.createdAt = user.createdAt;
  }

  hasError() {
    //存在错误
    return Object.values(this.errors).find(error => error.length > 0);
  }

  async validate() {
    //1. 用户名错误
    let cleanUsername = this.username.trim();
    console.log(cleanUsername);
    let existUser = await findUser(cleanUsername);
    if (cleanUsername === '') {
      this.errors.username.push('用户名不能为空');
      return;
    }
    if (cleanUsername.length > 10 || cleanUsername.length < 3) {
      this.errors.username.push('用户名长度要求3-10个字符');
      return;
    }
    if (existUser) {
      this.assign(existUser);
      this.generatePasswordDigest();
      if (existUser.passwordDigest !== this.passwordDigest) {
        this.errors.password.push('密码不匹配');
      }
    } else {
      this.errors.username.push('该用户不存在');
    }
  }
}
