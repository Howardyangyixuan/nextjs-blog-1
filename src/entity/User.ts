import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {Post} from './Post';
import {Comment} from './Comment';
import {SignUpErrors, SignUpUser} from '../../custom';
import {findUser} from '../../lib/users';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'varchar', unique: true})
  username: string;

  @Column('varchar')
  passwordDigest: string;

  @CreateDateColumn({type: 'timestamp'})
    // @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
    // @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  constructor(username: string, passwordDigest: string) {
    this.username = username;
    this.passwordDigest = passwordDigest;
  }
  //收集错误信息
   errors: SignUpErrors = {
    username: [],
    password: [],
    passwordConfirmation: []
  };

  hasError(){
    //存在错误
    return Object.values(this.errors).find(error => error.length > 0);
  }
  async validate(signUpUser:SignUpUser){
    //1. 用户名错误
    const {username, password, passwordConfirmation} = signUpUser;
    let cleanUsername = username.trim();
    console.log(cleanUsername);
    let existUser = await findUser(cleanUsername);
    if (cleanUsername === '') this.errors.username.push('用户名不能为空');
    if (cleanUsername.length > 10 || cleanUsername.length < 3) this.errors.username.push('用户名长度要求3-10个字符');
    if (existUser) {
      this.errors.username.push('该用户名已存在');
    }
    if (!/^\w*$/.test(username)) this.errors.username.push('用户名只允许出现数字、英文字母和下划线');
    //2. 密码错误
    if (password == '') this.errors.password.push('密码不能为空');
    //3. 密码确认错误
    if (password !== passwordConfirmation) this.errors.passwordConfirmation.push('两次密码不一致');
  }
}
