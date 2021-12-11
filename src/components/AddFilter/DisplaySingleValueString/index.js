import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFieldCriteria } from '../../../redux/structure/actions'
import FormButton from '../../Forms/FormButton'
import FormInput from '../../Forms/FormInput'

const DisplaySingleValueString = ({
  setValues,
  values,
  campo,
  setOrder,
}) => {
  const dispatch=useDispatch();
  return (
    <div style={{marginBottom:"5px",display:"flex",alignItems:"center"}}>  
        <span style={{display:"block"}}>{campo.fieldName} contains</span>&nbsp;
        <FormInput 
        style={{flex:1,marginBottom:"0",border:"none",borderBottom:"1px solid grey"}}
        value={values[campo.fieldName]?.val}
        onChange={(e)=>{
              setValues(values=>({...values,[campo.fieldName]:{...values[campo.fieldName],val:e.target.value}}))
          }
        }
        placeholder={campo.fieldName}/>
        <FormButton style={{width:"auto",marginLeft:"3px", marginBottom:"2px",marginTop:"0"}}
        onClick={()=>{
          dispatch(removeFieldCriteria(campo.fieldName))
          delete values[campo.fieldName]
        }
        }>-</FormButton>
        <FormButton style={{width:"auto",marginLeft:"3px", marginBottom:"2px",marginTop:"0"}}
        onClick={()=>{
          
          setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],order:"asc"}}))

        }}>U</FormButton>
        <FormButton style={{width:"auto",marginLeft:"3px", marginBottom:"2px",marginTop:"0"}}
        onClick={()=>{
          
          setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],order:"desc"}}))

        }}>D</FormButton>
    </div>
  )
}

export default DisplaySingleValueString
