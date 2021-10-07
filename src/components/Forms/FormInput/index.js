import React from 'react'
import './styles.scss'
const FormInput = ({value,onChange,type,placeholder}) => {
  return (
    <input type={type} className="input" onChange={onChange}
      placeholder={placeholder}
      value={value}/>
  )
}

export default FormInput;