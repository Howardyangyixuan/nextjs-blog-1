import {NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import {useForm} from '../hooks/useForm';
import Link from 'next/link';

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
        success: () => {
          window.alert('注册成功');
          window.location.href = '/sign_in';
        }
      }
    }
  );
  return (
    <>
      <h1>注册</h1>
      <p className='actions'>
        <Link href={'/'}><a>返回首页</a></Link>
        <Link href={'/posts'}><a>返回列表</a></Link>
        <Link href={'/sign_in'}><a>登录</a></Link>
      </p>
      {form}
      <style jsx>{`
        .actions > *{
        margin: 4px;
      }
        .actions > *:first-child{
        margin-left: 0;
      }`}
      </style>
    </>
  );
};
export default SignUp;