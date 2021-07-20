import {NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import withSession, {NextIronPageContext} from '../lib/withSession';
import {User} from '../src/entity/User';
import {useForm} from '../hooks/useForm';

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
        message: '成功登录'
      }
    });
  return (
    <>
      <div>登录</div>
      {
        props.user ?
          <div>当前登录用户为{props.user.username}</div> : null
      }
      {form}
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