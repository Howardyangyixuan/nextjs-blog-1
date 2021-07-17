import {NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {SignUpUser,SignUpErrors} from '../../custom';

const SignUp: NextPage = () => {
  const [signUpData, setSignUpData] = useState<SignUpUser>(
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
    console.log('保存数据');
    axios.post('/api/v1/users', signUpData)
      .then(
        () => {}, (error) => {
          const response: AxiosResponse = error.response;
          setErrors({...errors, ...response.data});
        });
  }, [signUpData]);

  return (
    <>
      <div>注册</div>
      {JSON.stringify(signUpData)}
      <hr/>
      {JSON.stringify(errors)}
      <hr/>
      <form onSubmit={onSubmit}>
        <div>
          <label>用户名</label>
          <input type="text" value={signUpData.username}
                 onChange={(e) => setSignUpData({...signUpData, username: e.target.value})}/>
          {errors.username.length > 0 ? <div>{errors.username.join(' ')}</div> : null}
        </div>
        <div>
          <label>密码</label>
          <input type="password" value={signUpData.password}
                 onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}/>
          {errors.password.length > 0 ? <div>{errors.password.join(' ')}</div> : null}
        </div>
        <div>
          <label>确认密码</label>
          <input type="password" value={signUpData.passwordConfirmation}
                 onChange={(e) => setSignUpData({...signUpData, passwordConfirmation: e.target.value})}/>
          {errors.passwordConfirmation.length > 0 ? <div>{errors.passwordConfirmation.join(' ')}</div> : null}
        </div>
        <button type="submit">提交</button>
      </form>
    </>
  );
};
export default SignUp;