import {GetServerSideProps, NextPage} from 'next';
import {useForm} from '../../../hooks/useForm';
import axios from 'axios';
import {Post} from '../../../src/entity/Post';
import {getPost} from '../../../lib/posts';
import React from 'react';
import {useNotFound} from '../../../hooks/useNotFound';
import Link from 'next/link';

type Props = {
  id: number;
  post: Post;
}
const PostsEdit: NextPage<Props> = (props) => {
  const {post, id} = props;
  console.log('post');
  console.log(post);
  if (!post) return useNotFound();
  const {form} = useForm({
    initFormData: {title: post.title, content: post.content},
    fields: [
      {label: '标题', type: 'text', key: 'title'},
      {label: '内容', type: 'textarea', key: 'content'},
    ],
    buttons: <div className="actions">
      <button type="submit">分享</button>
    </div>,
    submit: {
      request: formData => axios.patch(`/api/v1/posts`, {...formData, id}),
      success: () => {
        window.alert('树洞里出现了回声...');
        window.location.href = `/posts/${id}`;
      }
    }
  });
  return (
    <div className="postsNew">
      <div className="form-wrapper">
        <Link href={'/posts'}><a>返回树洞</a></Link>
        {form}
      </div>
      <style jsx global>{`
      .form-wrapper{
        padding: 16px;
      }
      .postsNew .field-content textarea{
        height: 20em; 
        resize: none;
      }
      .postsNew .label-text{
        width: 4em;
        text-align:right;
      }
      .postsNew .actions{
        text-align:center;
        background: #a5a5ee;
        padding: 4px 0;
      }
      `}</style>
    </div>
  );
};

export default PostsEdit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {id} = context.params;
  let post;
  if (typeof id === 'string') post = await getPost(id);
  else post = await getPost(id[0]);
  return {
    props: {
      id: parseInt(id.toString()),
      post: JSON.parse(JSON.stringify(post))
    }
  };
};