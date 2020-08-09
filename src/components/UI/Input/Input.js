import React from 'react'
import classes from './Input.module.scss'

function isInvalid({shouldValidate, touched, valid}) {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const inputType = props.type || 'text'
  const cls = [classes.Input]
  const htmlFor = `${props.type}-${Math.round()}`

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Error massage'}</span>
          : null
      }

    </div>
  )
}

export default Input
