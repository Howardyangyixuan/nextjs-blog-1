import {NextPage} from 'next';
import React from 'react';
import {getPosts} from '../../lib/posts';
import Link from 'next/link';
import queryString from 'query-string';
import {usePager} from 'hooks/usePager';
import withSession, {NextIronHandler, NextIronPageContext} from '../../lib/withSession';
import {User} from '../../custom';

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
  return (
    <>
      <div className="posts">
        <header>
          <h1>文章列表</h1>
          {currentUser && <Link href={'/posts/new'}><a>新增文章</a></Link>}
        </header>
        {posts.length == 0 ? <div>正在构思中...目前还有没有文章</div> :
          posts.map(post =>
            <div className="onePost">
              <Link key={post.id} href={`/posts/${post.id}`}>
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