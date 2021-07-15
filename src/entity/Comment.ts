import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {User} from './User';
import {Post} from './Post';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn({type:'timestamp'})
    // @CreateDateColumn()
  createdAt:Date;

  @UpdateDateColumn({type:'timestamp'})
    // @CreateDateColumn()
  updatedAt:Date;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;

  @ManyToOne(() => User, user => user.comments)
  user: User;
  constructor(user:User,post:Post,content:string) {
    this.user = user
    this.post = post
    this.content = content
  }
}
