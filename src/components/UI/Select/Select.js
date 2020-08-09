import React from 'react'
import classes from './Select.module.scss'

const Select = props => {
  const htmFor = `${props.label}-${Math.random()}`

  return (
    <div className={classes.Select}>
      <label htmlFor={htmFor}>{props.label}</label>
      <select
        id={htmFor}
        value={props.value}
        onChange={props.onChange}
      >
        { props.options.map((option, index) => {
          return (
            <option
              key={option.value + index}
              value={option.value}
            >
              {option.text}
            </option>
          )
        }) }

      </select>
    </div>
  )
}

export default Select
