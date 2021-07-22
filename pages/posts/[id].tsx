import React from 'react';
import {NextPage} from 'next';
import {getPost} from '../../lib/posts';
import {Post} from '../../src/entity/Post';
import marked from 'marked';
import withSession, {NextIronHandler, NextIronPageContext} from '../../lib/withSession';
import Link from 'next/link';
import {User} from '../../custom';

type Props = {
  post: Post,
  currentUser:User | null
}
const Page: NextPage<Props> = (props) => {
  const {post, currentUser} = props;
  return (
    <>
      <div className="wrapper">
        <header>
          <h1>{post.title}</h1>
          {currentUser &&
          <p>
            <Link href={"/posts/[id]/edit"} as={`/posts/${post.id}/edit`}><a>编辑</a></Link>
          </p>
          }
        </header>
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

export const getServerSideProps: NextIronHandler = withSession(async (context: NextIronPageContext) => {
  let {id} = context.query;
  let post;
  if (typeof id === 'string') post = await getPost(parseInt(id));
  else post = await getPost(parseInt(id[0]));
  const currentUser = context.req.session.get('currentUser') || null;
  return {
    props: {
      post,
      currentUser
    }
  };
});