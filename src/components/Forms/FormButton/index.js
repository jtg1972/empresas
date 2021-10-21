import React from 'react'
import './styles.scss'
const FormButton = ({onClick,children,fullLength,style}) => {
  return (
    <button className="btn" onClick={onClick} style={style}>{children}</button>
  )
}

export default FormButton
