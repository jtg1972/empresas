import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addFieldCriteria } from '../../../redux/structure/actions'
import FormButton from '../../Forms/FormButton'
import AlertMessage from '../AlertMessage'
import './styles.scss'
const mapToState=({structure})=>({
  fieldCriterias:structure.fieldCriterias,
  formFields:structure.formFields
})
const FilterHeader = ({
  fields,
  
}) => {
  const dispatch=useDispatch()
  const [moreFields,setMoreFields]=useState(false)
  const [addField,setAddField]=useState(false)

  const {
    fieldCriterias,
    formFields}
    =
  useSelector(mapToState)

  useEffect(()=>{
    getMoreFields();
  },[fieldCriterias,fields])

  const getMoreFields=()=>{
    Object.keys(fields).length
    ==
    fieldCriterias.length 
    ?
    setMoreFields(false)
    :
    setMoreFields(true)

  }
  
  const fieldsCriteriaToDisplay=()=>{
    return formFields.map(ff=>{
      return ff.fields.map((fd,i)=>{
        const found=fieldCriterias.filter(fc=>{
          return fc.fieldName==fd.fieldName
        })
        if(found.length==1){
          return null;
        }else{
          return <option key={i} value={fd.fieldName}>{fd.fieldName}</option>
        }   
      })
    }
  )}

  const selectChange=(e)=>{
    setAddField(false)
    dispatch(addFieldCriteria(
        fields[e.target.value]
    ))
  }
  const alertMessageConfig={
    message:"All Fields are Taken"
  }

  const buttonConfig={
    className:"buttonAddField",
    onClick:()=>{
      setAddField(true)
    }
  }

  const selectConfig={
    onChange:(e)=>selectChange(e),
    className:"selectStyle"
  }

  return (
    !moreFields
    ?
    <AlertMessage 
      {...alertMessageConfig}
    />
    :
    !addField
      ?
      (<FormButton 
          {...buttonConfig}
        >
        Add Field
      </FormButton>)
      :
      (<select 
        {...selectConfig}
      >
        <option value="">
          Select a field
        </option>
        {fieldsCriteriaToDisplay()}
      </select>
      )
    )
}

export default FilterHeader
