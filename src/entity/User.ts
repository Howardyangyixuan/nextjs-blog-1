import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {Post} from './Post';
import {Comment} from './Comment';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar')
    username: string;

    @Column('varchar')
    passwordDigest: string;

    @CreateDateColumn({type:'timestamp'})
      // @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn({type:'timestamp'})
      // @CreateDateColumn()
    updatedAt:Date;

    @OneToMany(() => Post, post=> post.author)
    posts: Post[];

    @OneToMany(() => Comment, comment=> comment.user)
    comments: Comment[];

    constructor(username:string,passwordDigest:string) {
        this.username = username
        this.passwordDigest = passwordDigest
    }
}
