import React from 'react';
import {GetStaticPaths, GetStaticProps, NextPage, NextPageContext} from 'next';
import {getPost, getPostIds} from '../../lib/posts';
import {Post} from '../../src/entity/Post';

type Props = {
  post: Post
}
const Page: NextPage<Props> = (props) => {
  const {post} = props;
  return (
    <div>
      <h1>{post.title}</h1>
      <article>
        {post.content}
      </article>
    </div>
  );
};
export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  let ids = await getPostIds();
  let paths = [];
  for (let id of ids) {
    paths.push({params: {id}});
  }
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (staticContext) => {
  const id = staticContext.params.id;
  let post;
  //id可能为数组，不知道为什么
  if (typeof id === 'string') post = await getPost(parseInt(id));
  else post = await getPost(parseInt(id[0]));
  return {
    props: {
      post
    }
  };
};
// export const getServerSideProps = async (context: NextPageContext) => {
//   let {id} = context.query;
//   console.log(id);
//   let post = await getPost(parseInt(id));
//   return {
//     props: {
//       post
//     }
//   };
// };