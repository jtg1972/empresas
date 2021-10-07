import React from 'react'
import './styles.scss'
const FormButton = ({onClick,children,fullLength}) => {
  return (
    <button className="btn" onClick={onClick}>{children}</button>
  )
}

export default FormButton
