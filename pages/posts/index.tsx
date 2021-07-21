import {GetServerSideProps, NextPage} from 'next';
import React from 'react';
import {getPosts} from '../../lib/posts';
import Link from 'next/link';
import queryString from 'query-string';

type Post = {
  id: string;
  date: string;
  title: string;
}
type Props = {
  posts: Post[],
  page: number,
  pages: number,
  cnt: number
}
const PostsIndex: NextPage<Props> = (props) => {
  const {posts, page, pages, cnt} = props;
  return (
    <div>
      <h1>文章列表({cnt})</h1>
      {posts.length == 0 ? <div>正在构思中...目前还有没有文章</div> :
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      }
      <footer>
        第{page}页 共{pages}页
        <div>
          {page !== 1 ? <Link href={`?page=${page - 1}`}><a>上一页</a></Link> : null}
        </div>
        <div>
          {page !== pages ? <Link href={`?page=${page + 1}`}><a>下一页</a></Link> : null}
        </div>
      </footer>
    </div>
  );
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const index = context.req.url.indexOf('?');
  const search = context.req.url.substr(index);
  const parsed = queryString.parse(search);
  const page = parseInt(parsed.page.toString()) || 1;
  const perPage = 5;
  const [posts, cnt] = await getPosts(page, perPage);
  const pages = Math.ceil(cnt / perPage);
  return {
    props: {
      posts,
      page,
      cnt,
      pages
    }
  };
};