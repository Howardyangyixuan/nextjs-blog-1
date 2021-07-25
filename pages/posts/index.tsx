import {NextPage} from 'next';
import React, {useCallback} from 'react';
import {getPosts} from '../../lib/posts';
import Link from 'next/link';
import queryString from 'query-string';
import {usePager} from 'hooks/usePager';
import withSession, {NextIronHandler, NextIronPageContext} from '../../lib/withSession';
import {User} from '../../custom';
import axios from 'axios';

type Post = {
  id: string;
  date: string;
  title: string;
}
type Props = {
  posts: Post[],
  page: number,
  totalPage: number,
  cnt: number,
  currentUser: User | null
}
const PostsIndex: NextPage<Props> = (props) => {
  const {posts, page, totalPage, currentUser} = props;
  const {pager} = usePager({
    page, totalPage,
  });
  const logout = useCallback(async () => {
    await axios.get('/api/v1/logout');
    window.location.href = '/posts';
  }, []);
  return (
    <>
      <div className="posts">
        <header>
          <h1><Link href="/"><a>🕳️</a></Link></h1>
          <p className="actions">
            {currentUser ?
              (<>
                <button onClick={logout}>登出</button>
                <Link href={'/posts/new'}>
                  <a>吐露心声</a></Link></>) :
              <><Link href={'/sign_in'}><a>登录</a></Link>
                <Link href={'/sign_up'}><a>注册</a></Link></>}
          </p>
        </header>
        {posts.length == 0 ? <div>树洞里竟是空的...</div> :
          posts.map(post =>
            <div key={post.id} className="onePost">
              <Link href={`/posts/${post.id}`}>
                <a>
                  {post.title}
                </a>
              </Link>
            </div>
          )
        }
        <footer>
          {pager}
        </footer>
      </div>
      <style jsx>{`
      .posts{
        max-width: 800px;
        margin: 0 auto;
        padding: 16px;
        }
      .posts >header{
        display:flex;
        align-items: center;
      }
      .posts >header > h1{
         margin: 0 auto 0 0;
      }
      .posts >header > h1 > a{
         border-bottom: none;
      }
        .onePost{
        border-bottom: 1px solid #ddd;
        padding: 8px 0;
        }
        .onePost > a{
        border-bottom: none;
        color: white;
        }
        .onePost > a:hover{
        color: #a5a5ee
        }
        .actions > *{
        margin: 4px; 
      }
      .actions > *:first-child{
        margin-left: 0; 
      }
        `}</style>
    </>
  );
};
export default PostsIndex;

export const getServerSideProps: NextIronHandler = withSession(async (context: NextIronPageContext) => {
  const index = context.req.url.indexOf('?');
  const search = context.req.url.substr(index);
  const parsed = queryString.parse(search);
  const _page = parseInt(parsed.page?.toString()) || 1;
  const perPage = 10;
  const {page, posts, cnt} = await getPosts(_page, perPage);
  const totalPage = Math.ceil(cnt / perPage);
  const currentUser = (context.req as any).session.get('currentUser') || null;
  return {
    props: {
      currentUser,
      posts,
      page,
      cnt,
      totalPage
    }
  };
});