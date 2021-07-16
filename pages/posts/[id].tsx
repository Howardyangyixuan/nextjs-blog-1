import React from 'react';
import {GetStaticPaths, GetStaticProps, NextPage, NextPageContext} from 'next';
import {getPost} from '../../lib/posts';
import {Post} from '../../src/entity/Post';
import exp from 'constants';
import {assertSuper} from '@babel/types';

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

export const getStaticPaths:GetStaticPaths = ()=>{
  let paths = []
  for(let i=1;i<12;i++){
    paths.push({params:{id:i.toString()}})
  }
  return {
    paths,
    fallback:false
  }
}

export const getStaticProps:GetStaticProps = async(staticContext)=>{
  const id = staticContext.params.id
  console.log(id);
  let post = await getPost(parseInt(id));
  return {
    props: {
      post
    }
  };
}
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