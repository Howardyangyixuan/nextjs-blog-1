import {NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {SignInUser, SignInErrors} from '../custom';
import withSession, {NextIronPageContext} from '../lib/withSession';
import {User} from '../src/entity/User';
import {Form} from '../components/Form';

type userSession = {
  user: User
}

const SignIn: NextPage<userSession> = (props) => {
  const [signInData, setSignInData] = useState<SignInUser>(
    {
      username: '',
      password: '',
    }
  );
  const [errors, setErrors] = useState<SignInErrors>(
    {
      username: [],
      password: [],
    }
  );
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    axios.post('/api/v1/sessions', signInData)
      .then(
        (user) => {
          console.log(user);
          window.alert('登录成功');
        }, (error) => {
          const response: AxiosResponse = error.response;
          setErrors({...response.data});
        });
  }, [signInData]);

  const onChange = useCallback((key, value) => {
    setSignInData({...signInData, [key]: value});
  }, [signInData]);
  return (
    <>
      <div>登录</div>
      {
        props.user ?
          <div>当前登录用户为{props.user.username}</div> : null
      }
      <hr/>
      {JSON.stringify(signInData)}
      <hr/>
      {JSON.stringify(errors)}
      <hr/>
      <Form
        onSubmit={onSubmit}
        buttons={<>
          <button type="submit">提交</button>
        </>}
        fields={[
          {
            label: '用户名', type: 'text', value: signInData.username,
            onChange: (e) => onChange('username', e.target.value),
            errors: errors.username
          },
          {
            label: '密码', type: 'password', value: signInData.password,
            onChange: (e) => onChange('password', e.target.value),
            errors: errors.password
          }
        ]}/>
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