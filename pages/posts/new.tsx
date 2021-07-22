import {NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import {useForm} from '../../hooks/useForm';

const PostsNew: NextPage = () => {
  const {form} = useForm({
    initFormData: {title: '初始标题', content: '初始内容',},
    fields: [
      {label: '标题', type: 'text', key: 'title'},
      {label: '内容', type: 'textarea', key: 'content'}],
    submit: {
      request: formData => axios.post('/api/v1/posts', formData),
      success: () => {
        window.alert('提交成功');
        window.location.href = '/posts';
      }
    },
    buttons: <div className="actions">
      <button type="submit">提交</button>
    </div>
  });
  return (
    <div className="postsNew">
      <div className="form-wrapper">
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

export default PostsNew;
