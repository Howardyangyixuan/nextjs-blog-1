import {GetServerSideProps, NextPage} from 'next';
import React from 'react';
import {getPosts} from '../../lib/posts';
import Link from 'next/link';
import queryString from 'query-string';
import {usePager} from 'hooks/usePager';

type Post = {
  id: string;
  date: string;
  title: string;
}
type Props = {
  posts: Post[],
  page: number,
  totalPage: number,
  cnt: number
}
const PostsIndex: NextPage<Props> = (props) => {
  const {posts, page, totalPage} = props;
  const {pager} = usePager({
    page, totalPage,
  });
  return (
    <>
      <div className="posts">
        <h1>文章列表</h1>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const index = context.req.url.indexOf('?');
  const search = context.req.url.substr(index);
  const parsed = queryString.parse(search);
  const _page = parseInt(parsed.page?.toString()) || 1;
  const perPage = 10;
  const {page, posts, cnt} = await getPosts(_page, perPage);
  const totalPage = Math.ceil(cnt / perPage);
  return {
    props: {
      posts,
      page,
      cnt,
      totalPage
    }
  };
};