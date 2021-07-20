import {NextPage} from 'next';
import React from 'react';
import axios, {AxiosResponse} from 'axios';
import {useForm} from '../hooks/useForm';

const SignUp: NextPage = () => {
  const initFormData = {
    username: '初始值',
    password: '初始密码',
    passwordConfirmation: '初始确认密码'
  };
  const onSubmit = (formData: typeof initFormData) => {
    axios.post('/api/v1/users', formData)
      .then(
        () => {
          window.alert('注册成功');
          window.location.href = '/sign_in';
        }, (error) => {
          const response: AxiosResponse = error.response;
          setErrors({...response.data});
        });
  };
  const {setErrors, form} = useForm(
    {
      initFormData,
      fields: [
        {label: '用户名', type: 'text', key: 'username'},
        {label: '密码', type: 'password', key: 'password'},
        {label: '确认密码', type: 'password', key: 'passwordConfirmation'}
      ],
      buttons: <button type="submit">注册</button>,
      onSubmit
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