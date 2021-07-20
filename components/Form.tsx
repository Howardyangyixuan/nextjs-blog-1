import React, {ChangeEventHandler, FormEventHandler, ReactChild} from 'react';

type Props = {
  fields: {
    label: string
    type: 'text' | 'password' | 'textarea'
    value: string | number
    onChange: ChangeEventHandler<HTMLInputElement>
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
          field.type === 'textarea' ?
            <textarea onSubmit={props.onSubmit}>hi</textarea>
            :
            <div>
              <label>{field.label}</label>
              <input type={field.type} onChange={field.onChange}/>
              {field.errors?.length > 0 ? <div>{field.errors.join(' ')}</div> : null}
            </div>
        )}
        {props.buttons}
      </form>
    </>
  )
    ;
};