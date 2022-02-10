import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addFieldCategory,getStructureCategory } from '../../redux/structure/actions'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'

import './styles.scss'
const mapToState=({product,structure})=>({
  categoryObject:product.category,
  subCategories:product.subCategories,
  breadCrumb:product.breadCrumb

})

const StructureField = ({
  openDialog,
  toggleDialog,
  category,
  }) => {
  
  const {categoryObject,
    subCategories,
    breadCrumb}=
  useSelector(mapToState)
  
  const [fieldName,setFieldName]=useState("")
  const [displayName,setDisplayName]=useState("")
  const [type,setType]=useState("")
  const [declaredType,setDeclaredType]=useState("")
  const dispatch=useDispatch()
    
  const onAddFieldClick=()=>{
    dispatch(addFieldCategory({
      category,
      value:{
        fieldName,
        displayName,
        dataType:type,
        declaredType
      }
    }))
    dispatch(getStructureCategory({category,subCategories,breadCrumb}))

  }

  const dialogConfig={
    open:openDialog,
    closeDialog:()=>toggleDialog(),
    headline:"Add field to "+ categoryObject.name
  }

  const inputFieldNameConfig={
    onChange:e=>setFieldName(e.target.value),
    value:fieldName, 
    placeholder:"Field Name"
  }

  const inputDisplayNameConfig={
    placeholder:"Display Name",
    onChange:e=>setDisplayName(e.target.value),
    value:displayName
  }
  
  const selectConfig={
    className:"noOutline", 
    onChange:(e)=>setType(e.target.value)
  }

  const selectConfigDeclaredType={
    className:"noOutline",
    onChange:(e)=>setDeclaredType(e.target.value)
  }

  const buttonAddFieldConfig={
    className:"marginTop10",
    onClick:()=>onAddFieldClick()
      
  }


  return (
    <Dialog 
     {...dialogConfig}
    >
      <FormInput
        {...inputFieldNameConfig}/>
      <FormInput
        {...inputDisplayNameConfig}/>      
      <select {...selectConfig}>
        <option value="">Select the type</option>
        <option value="singleValue">Single Value</option>
        <option value="multipleValue">Multiple Value</option>
        
      </select>
      {type=="singleValue" && 
      <select {...selectConfigDeclaredType}>
        <option value="">Select the data type</option>
        <option value="string">String</option>
        <option value="numeric">Numeric</option>
        <option value="date">Date</option>
        <option value="relacion1toM">Relacion 1 a muchos</option>
      </select>}
      <FormButton {...buttonAddFieldConfig}>
        Add Field
      </FormButton>
    </Dialog>
      
    
  )
}

export default StructureField
