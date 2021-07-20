import React, {ReactChild, useCallback, useState} from 'react';
import {AxiosResponse} from 'axios';

type Field<T> = {
  label: string
  type: 'text' | 'password' | 'textarea'
  key: keyof T
}

type useFormOptions<T> = {
  initFormData: T;
  fields: Field<T>[];
  buttons: ReactChild
  submit: {
    request: (formData: T) => Promise<AxiosResponse<T>>,
    message: string
  }
}

export function useForm<T>(options: useFormOptions<T>) {
  const {initFormData, fields, buttons, submit} = options;
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(() => {
    const initErrors: { [key in keyof T]?: string[] } = {};
    for (let key in initFormData) {
      if (initFormData.hasOwnProperty(key)) initErrors[key] = [];
    }
    return initErrors;
  });
  const onChange = useCallback((key: keyof T, value: any) => {
    setFormData({...formData, [key]: value});
  }, [formData]);
  const _onSubmit = useCallback((e) => {
    e.preventDefault();
    submit.request(formData).then(() => {
      window.alert(submit.message);
    }, (error) => {
      const response: AxiosResponse<T> = error.response;
      setErrors({...response.data});
    });
  }, [formData, submit, setErrors]);
  const form = (
    <>
      <div>{JSON.stringify(formData)}</div>
      <div>{JSON.stringify(errors)}</div>
      <form onSubmit={e => _onSubmit(e)}>
        {fields.map(field =>
          <div key={field.label}>
            <label>{field.label}</label>
            {field.type === 'textarea' ?
              <textarea onChange={e => onChange(field.key, e.target.value)} value={formData[field.key].toString()}/>
              :
              <input type={field.type} onChange={e => onChange(field.key, e.target.value)}
                     value={formData[field.key].toString()}/>}
            {errors[field.key]?.length > 0 ? <div>{errors[field.key].join(' ')}</div> : null}
          </div>
        )}
        {buttons}
      </form>
    </>
  );
  return {
    form
  };
}
