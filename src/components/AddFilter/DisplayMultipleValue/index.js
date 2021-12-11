import React from 'react'
import { useDispatch } from 'react-redux';
import { removeFieldCriteria } from '../../../redux/structure/actions'
import FormButton from '../../Forms/FormButton'

const DisplayMultipleValue = ({
  setValues,
  values,
  campo,
  setOrder,
}) => {
  const dispatch=useDispatch();
  return (
    <div style={{marginBottom:"5px",display:"flex",alignItems:"center"}}>  
      <span style={{display:"block"}}>{campo.fieldName}</span>
      <span style={{display:"block"}}>&nbsp;is&nbsp; </span>
      <select style={{flex:1,outline:"none"}}
        onChange={(e)=>{
          setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],val:e.target.value}}))         
        }}
        value={values[campo.fieldName]?.val}
      >
        <option value="">Select an option</option>
        {campo.values.map(v=>{
          return <option value={v.value}>{v.value}</option>
        })}
      </select>
      <FormButton style={{width:"auto",marginLeft:"3px",marginTop:"0"}}
      onClick={()=>{
        dispatch(removeFieldCriteria(campo.fieldName))
        delete values[campo.fieldName]
      
      }}>-</FormButton>
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

export default DisplayMultipleValue
