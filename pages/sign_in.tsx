import {NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {SignUpUser, SignUpErrors} from '../custom';
import withSession, {NextIronPageContext} from '../lib/withSession';
import {User} from '../src/entity/User';

type userSession = {
  user: User
}

const SignIn: NextPage<userSession> = (props) => {
  console.log(props.user);
  const [signInData, setSignInData] = useState<SignUpUser>(
    {
      username: '',
      password: '',
      passwordConfirmation: ''
    }
  );
  const [errors, setErrors] = useState<SignUpErrors>(
    {
      username: [],
      password: [],
      passwordConfirmation: []
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
      <form onSubmit={onSubmit}>
        <div>
          <label>用户名</label>
          <input type="text" value={signInData.username}
                 onChange={(e) => setSignInData({...signInData, username: e.target.value})}/>
          {errors.username.length > 0 ? <div>{errors.username.join(' ')}</div> : null}
        </div>
        <div>
          <label>密码</label>
          <input type="password" value={signInData.password}
                 onChange={(e) => setSignInData({...signInData, password: e.target.value})}/>
          {errors.password.length > 0 ? <div>{errors.password.join(' ')}</div> : null}
        </div>
        <button type="submit">提交</button>
      </form>
    </>
  );
};
export default SignIn;

export const getServerSideProps = withSession(async (context: NextIronPageContext) => {
  const user = await context.req.session.get('currentUser');
  return {
    props: {
      user
    }
  };
});