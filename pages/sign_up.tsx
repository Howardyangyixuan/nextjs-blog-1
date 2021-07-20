import {NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {SignUpUser, SignUpErrors} from '../custom';
import {Form} from '../components/Form';

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

  const onChange = useCallback((key, value) => {
    setSignUpData({...signUpData, [key]: value});
  }, [signUpData]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    axios.post('/api/v1/users', signUpData)
      .then(
        () => {
          window.alert('注册成功');
          window.location.href = '/sign_in';
        }, (error) => {
          const response: AxiosResponse = error.response;
          console.log(errors);
          setErrors({...response.data});
        });
  }, [signUpData]);

  return (
    <>
      <div>注册</div>
      {JSON.stringify(signUpData)}
      <hr/>
      {JSON.stringify(errors)}
      <hr/>
      <Form
        onSubmit={onSubmit}
        fields={[
          {
            label: '用户名', type: 'text', value: signUpData.username,
            onChange: (e) => onChange('username', e.target.value),
            errors: errors.username
          },
          {
            label: '密码', type: 'password', value: signUpData.password,
            onChange: (e) => onChange('password', e.target.value),
            errors: errors.password
          },
          {
            label: '确认密码', type: 'password', value: signUpData.passwordConfirmation,
            onChange: (e) => onChange('passwordConfirmation', e.target.value),
            errors: errors.passwordConfirmation
          }
        ]}
        buttons={<>
          <button type="submit">提交</button>
        </>}
      />
    </>
  );
};
export default SignUp;