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
  const {posts, page, totalPage, cnt} = props;
  const {pager} = usePager({
    page, totalPage,
  });
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
        {pager}
      </footer>
    </div>
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