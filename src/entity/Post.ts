import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {User} from './User';
import {Comment} from './Comment';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int')
  authorId: number;

  @Column('varchar')
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn({type:'timestamp'})
  // @CreateDateColumn()
  createdAt:Date;

  @UpdateDateColumn({type:'timestamp'})
  // @CreateDateColumn()
  updatedAt:Date;

  @ManyToOne(() => User, author => author.posts)
  author: User;

  @OneToMany(() => Comment, comment=> comment.post)
  comments: Comment[];
  constructor(authorId:number,title: string, content: string) {
    this.authorId = authorId;
    this.title = title;
    this.content = content;
  }
}
