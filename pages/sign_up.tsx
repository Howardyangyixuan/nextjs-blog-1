import {NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import {useForm} from '../hooks/useForm';

const SignUp: NextPage = () => {
  const {form} = useForm(
    {
      initFormData: {
        username: '初始值',
        password: '初始密码',
        passwordConfirmation: '初始确认密码'
      },
      fields: [
        {label: '用户名', type: 'text', key: 'username'},
        {label: '密码', type: 'password', key: 'password'},
        {label: '确认密码', type: 'password', key: 'passwordConfirmation'}
      ],
      buttons: <button type="submit">注册</button>,
      submit: {
        request: formData => axios.post('/api/v1/users', formData),
        message: '注册成功'
      }
    }
  );
  return (
    <>
      <div>注册</div>
      {form}
    </>
  );
};
export default SignUp;