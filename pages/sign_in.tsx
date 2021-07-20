import {NextPage} from 'next';
import React, {useCallback} from 'react';
import axios, {AxiosResponse} from 'axios';
import withSession, {NextIronPageContext} from '../lib/withSession';
import {User} from '../src/entity/User';
import {useForm} from '../hooks/useForm';

type userSession = {
  user: User
}

const SignIn: NextPage<userSession> = (props) => {
  const onSubmit = useCallback((formData) => {
    axios.post('/api/v1/sessions', formData)
      .then(
        (user) => {
          console.log(user);
          window.alert('登录成功');
        }, (error) => {
          const response: AxiosResponse = error.response;
          setErrors({...response.data});
        });
  }, []);

  const {form, setErrors} = useForm(
    {
      initFormData: {username: '初始值', password: '初始密码',},
      fields: [
        {label: '用户名', type: 'text', key: 'username'},
        {label: '密码', type: 'password', key: 'password'}
      ],
      buttons: <button type="submit">登录</button>,
      onSubmit
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