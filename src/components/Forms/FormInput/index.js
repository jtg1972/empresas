import React from 'react'
import './styles.scss'
const FormInput = ({value,onChange,type,placeholder,...other}) => {
  return (
    <input type={type} className="input" onChange={onChange}
      placeholder={placeholder}
      value={value}
      {...other}/>
  )
}

export default FormInput;