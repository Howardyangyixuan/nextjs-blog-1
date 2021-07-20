import React, {ChangeEventHandler, FormEventHandler, ReactChild} from 'react';

type Props = {
  fields: {
    label: string
    type: 'text' | 'password' | 'textarea'
    value: string | number
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    errors: string[]
  }[],
  buttons: ReactChild,
  onSubmit: FormEventHandler
}

export const Form: React.FC<Props> = (props) => {
  return (
    <>
      <form onSubmit={props.onSubmit}>
        {props.fields.map(field =>
          <div key={field.label}>
            <label>{field.label}</label>
            {field.type === 'textarea' ?
              <textarea onChange={field.onChange} value={field.value}/>
              :
              <input type={field.type} onChange={field.onChange} value={field.value}/>}
            {field.errors?.length > 0 ? <div>{field.errors.join(' ')}</div> : null}
          </div>
        )}
        {props.buttons}
      </form>
    </>
  )
    ;
};