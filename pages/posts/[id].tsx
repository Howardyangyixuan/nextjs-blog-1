import React from 'react';
import {NextPage, NextPageContext} from 'next';
import {getPost} from '../../lib/posts';
import {Post} from '../../src/entity/Post';
import marked from 'marked'

type Props = {
  post: Post
}
const Page: NextPage<Props> = (props) => {
  const {post} = props;
  return (
    <>
      <div className="wrapper">
        <h1>{post.title}</h1>
        <article className="markdown-body" dangerouslySetInnerHTML={{__html: marked(post.content)}}>
        </article>
      </div>
      <style jsx>{`
      .wrapper{
        max-width: 800px;
        margin: 16px auto;
        padding: 0 16px;
      }
      h1{padding-bottom: 16px; border-bottom: 1px solid #666;}
      `}</style>
    </>
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