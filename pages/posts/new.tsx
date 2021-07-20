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
      message: '提交成功'
    },
    buttons: <button type='submit'>提交</button>
  });
  return (
    <div>
      {form}
    </div>
  );
};

export default PostsNew;
