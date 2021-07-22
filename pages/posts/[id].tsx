import React from 'react';
import {NextPage, NextPageContext} from 'next';
import {getPost} from '../../lib/posts';
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

export const getServerSideProps = async (context: NextPageContext) => {
  let {id} = context.query;
  let post;
  if (typeof id === 'string') post = await getPost(parseInt(id));
  else post = await getPost(parseInt(id[0]));
  return {
    props: {
      post
    }
  };
};