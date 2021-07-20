import {NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import {Form} from '../../components/Form';
import {Post, PostErrors} from '../../custom';
import axios, {AxiosResponse} from 'axios';

const PostsNew: NextPage = () => {
  const [post, setPost] = useState<Post>(
    {
      title: '',
      content: '',
    }
  );
  const [errors, setErrors] = useState<PostErrors>(
    {
      title: [],
      content: [],
    }
  );
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    axios.post('/api/v1/posts', post)
      .then(
        (res) => {
          console.log(res);
          window.alert('提交成功');
        }, (error) => {
          const response: AxiosResponse = error.response;
          setErrors({...response.data});
        });
  }, [post]);

  const onChange = useCallback((key, value) => {
    setPost({...post, [key]: value});
  }, [post]);

  return (
    <div>
      {JSON.stringify(post)}
      <Form
        onSubmit={onSubmit}
        buttons={
          <div>
            <button type='submit'>提交</button>
          </div>}
        fields={[
          {
            label: '标题', type: 'text', value: post.title,
            onChange: e => onChange('title', e.target.value),
            errors: errors.title
          },
          {
            label: '内容', type: 'textarea', value: post.content,
            onChange: e => onChange('content', e.target.value),
            errors: errors.content
          },
        ]}
      />
    </div>
  );
};

export default PostsNew;
