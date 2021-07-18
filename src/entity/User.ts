import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert, BeforeUpdate
} from 'typeorm';
import {Post} from './Post';
import {Comment} from './Comment';
import md5 from 'md5';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'varchar', unique: true})
  username: string;

  password: string;

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

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  generatePasswordDigest() {
    this.passwordDigest = md5(this.password);
  }
}
