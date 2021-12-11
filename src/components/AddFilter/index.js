import React,{useState,useEffect} from 'react'
import { BsExclamationSquareFill } from 'react-icons/bs'
import { FaBorderNone, FaCreativeCommonsSamplingPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addFieldCriteria, fetchFilterResults, removeFieldCriteria } from '../../redux/structure/actions'
import Dialog from '../Dialog'
import DisplayFields from '../DisplayFields'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'
import DisplayAllFieldsCriteria from './DisplayAllFieldsCriteria'
import DisplayMultipleValue from './DisplayMultipleValue'
import DisplaySingleValueNumber from './DisplaySingleValueNumber'
import DisplaySingleValueString from './DisplaySingleValueString'
import FilterHeader from './FilterHeader'

const mapToState=({structure})=>({
  products:structure.productsFromStructure,
  formFields:structure.formFields,
  fieldCriterias:structure.fieldCriterias
})

const AddFilter = ({
  openDialog,
  toggleDialog,
  values,
  setValues,
  setSearchProductsFilter,
  
}) => {

  const {formFields,fieldCriterias}=useSelector(mapToState)
  const [fields,setFields]=useState({})
  const dispatch=useDispatch()
  const [operator,setOperator]=useState("igual")
  const [order,setOrder]=useState("")
  const [isGreater,setIsGreater]=useState(false)
  useEffect(()=>{
    let fIn={}
    formFields.forEach(ff=>{
      ff.fields.forEach(f=>{
        const fieldName=f.fieldName
        fIn={...fIn,[fieldName]:f}
      })

    })
    setFields(fIn)
  },[formFields])

 const fieldsGreaterThanZero=()=>{
  if(Object.keys(values).length>0)
    return true
  else 
    return false
 }

 const dialogConfig={
  open:openDialog,
  closeDialog:toggleDialog,
  headline:"Añadir Filtros"
 }
 const displayAllFieldsCriteriaConfig={
  setValues,
  values,
  setOrder,
  operator,
  setOperator
 }

 const buttonConfig={
  onClick:()=>{
    setSearchProductsFilter(true)
    dispatch(fetchFilterResults(values))
  }
 }
  
  
  return (
    <Dialog
      {...dialogConfig}
    >
      <FilterHeader 
        fields={fields}
      />
      <DisplayAllFieldsCriteria
        {...displayAllFieldsCriteriaConfig}
      />
      {fieldsGreaterThanZero()
      ? 
      <FormButton
          {...buttonConfig}
        >Filter now</FormButton>
      :
      ""
      }
      
      
    </Dialog>
  )
}

export default AddFilter
