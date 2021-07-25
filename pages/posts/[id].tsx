import React, {useCallback} from 'react';
import {NextPage} from 'next';
import {getPost} from '../../lib/posts';
import {Post} from '../../src/entity/Post';
import marked from 'marked';
import withSession, {NextIronHandler, NextIronPageContext} from '../../lib/withSession';
import Link from 'next/link';
import {User} from '../../custom';
import {useRouter} from 'next/router';
import axios from 'axios';
import {useNotFound} from '../../hooks/useNotFound';

type Props = {
  id: string | string[]
  post: Post,
  currentUser: User | null
}
const Page: NextPage<Props> = (props) => {
  const {post, currentUser, id} = props;
  const router = useRouter();
  const onRemove = useCallback(() => {
    axios.delete(`/api/v1/posts?id=${id}`).then(() => {
      // axios.delete(`/api/v1/posts/${id}`).then(() => {
      window.alert('回声消失了...');
      router.push('/posts');
    }, () => {
      window.alert('树洞堵住了...');
    });
  }, [id]);
  if (!post) return useNotFound();
  return (
    <>
      <div className="wrapper">
        <header>
          <h1>{post.title}</h1>
          <p className="actions">
            {currentUser && <>
              <Link href={'/posts/[id]/edit'} as={`/posts/${post.id}/edit`}><a>编辑</a></Link>
              <button onClick={onRemove}>删除</button>
            </>
            }
            <Link href={'/posts'}><a>返回树洞</a></Link>
          </p>
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
      .actions > *{
        margin: 4px; 
      }
      .actions > *:first-child{
        margin-left: 0; 
      }
      `}</style>
    </>
  );
};
export default Page;

export const getServerSideProps: NextIronHandler = withSession(async (context: NextIronPageContext) => {
  let {id} = context.query;
  let post;
  if (typeof id === 'string') post = await getPost(id);
  else post = await getPost(id[0]);
  const currentUser = context.req.session.get('currentUser') || null;
  return {
    props: {
      id,
      post,
      currentUser
    }
  };
});