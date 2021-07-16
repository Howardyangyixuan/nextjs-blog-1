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
  console.log(id);
  let post = await getPost(parseInt(id));
  return {
    props: {
      post
    }
  };
};