import {GetStaticProps, NextApiRequest, NextApiResponse, NextPage} from 'next';
import React from 'react';
import {getPosts} from '../../lib/posts';
import Link from 'next/link';

type Post = {
  id: string;
  date: string;
  title: string;
}
type Props = {
  posts: Post[]
}
const PostsIndex: NextPage<Props> = (props) => {
  // console.log(props.posts);
  let posts = props.posts;
  return (
    <div>
      <h1>文章列表</h1>
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
    </div>
  );
};
export default PostsIndex;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();
  // console.log(posts);
  return {
    props: {
      posts
    }
  };
};