import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFieldCriteria } from '../../../redux/structure/actions'
import FormButton from '../../Forms/FormButton'
import FormInput from '../../Forms/FormInput'

const DisplaySingleValueNumber = ({
  setValues,
  values,
  campo,
  setOrder,
  operator,
  setOperator
}) => {
  const dispatch=useDispatch()
  return (
    <div style={{marginBottom:"5px",display:"flex",alignItems:"center"}}>  
    <span style={{display:"block"}}>{campo.fieldName} </span>
    <select 
    style={{flex:1,outline:"none"}}
    value={operator}
    onChange={(e)=>{
      setOperator(e.target.value)
      setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],operator:e.target.value}}))
    }}

    >
      <option value="igual"> igual </option>
      <option value="menor"> menor que </option>
      <option value="mayor"> mayor que </option>
    </select>
    <FormInput
      value={values[campo.fieldName]?.val!==undefined?
      values[campo.fieldName].val:""} 
      onChange={(e)=>{
            setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],val:e.target.value}}))
      }}
      placeholder={campo.fieldName}
      style={{marginBottom:0,marginBottom:"0",border:"none",borderBottom:"1px solid grey"
    }}/>
    <FormButton style={{width:"auto",marginLeft:"3px",marginTop:"0"}}
    onClick={()=>{
      dispatch(removeFieldCriteria(campo.fieldName))
      delete values[campo.fieldName]
    }}
    >-</FormButton>
    <FormButton style={{width:"auto",marginLeft:"3px", marginBottom:"2px",marginTop:"0"}}
      onClick={()=>{
        setOrder("asc")
        setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],order:"asc"}}))

      }}>U</FormButton>
    <FormButton style={{width:"auto",marginLeft:"3px", marginBottom:"2px",marginTop:"0"}}
      onClick={()=>{
        setOrder("desc")
        setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],order:"desc"}}))

      }}>D</FormButton>
  </div>
  )
}

export default DisplaySingleValueNumber
{

}