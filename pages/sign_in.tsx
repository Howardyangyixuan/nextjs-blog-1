import {NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import withSession, {NextIronPageContext} from '../lib/withSession';
import {User} from '../src/entity/User';
import {useForm} from '../hooks/useForm';
import queryString from 'query-string';
import Link from 'next/link';

type userSession = {
  user: User
}

const SignIn: NextPage<userSession> = (props) => {
  const {form} = useForm(
    {
      initFormData: {username: '初始值', password: '初始密码'},
      fields: [
        {label: '用户名', type: 'text', key: 'username'},
        {label: '密码', type: 'password', key: 'password'}
      ],
      buttons: <button type="submit">登录</button>,
      submit: {
        request: (formData) => axios.post('/api/v1/sessions', formData),
        success: () => {
          window.alert('登录成功');
          const parsed = queryString.parse(location.search);
          window.location.href = parsed.return_to?.toString() || 'sign_in';
        }
      }
    });
  return (
    <>
      <h1>登录
        {props.user ? <> 当前登录用户为{props.user.username}</> : null}</h1>
      <p className='actions'>
        <Link href={'/'}><a>返回首页</a></Link>
        <Link href={'/sign_up'}><a>注册</a></Link>
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
export default SignIn;

export const getServerSideProps = withSession(async (context: NextIronPageContext) => {
  const user = await context.req.session.get('currentUser');
  return {
    props: {
      user: user || ''
    }
  };
});