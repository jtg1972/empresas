import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addFieldCategory, fetchAllStructures } from '../../redux/structure/actions'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'

const mapToState=({structure})=>({
  allStructures:structure.categoryStructures
})

const StructureField = ({
  openDialog,
  toggleDialog,
  catName,
  category}) => {
  const {allStructures}=useSelector(mapToState)
  const [fieldName,setFieldName]=useState("")
  const [displayName,setDisplayName]=useState("")
  const [type,setType]=useState("singleValue")
  const dispatch=useDispatch()
  console.log("categoryfield",category);

  useEffect(()=>{
    console.log("categoryfield",category)
    dispatch(fetchAllStructures())
  },[])
  return (
    <Dialog 
      open={openDialog}
      closeDialog={toggleDialog}
      headline={"Add field to "+ catName}
    >
      <FormInput
        onChange={e=>setFieldName(e.target.value)}
        value={fieldName} 
        placeholder="Field Name"
      ></FormInput>
      <FormInput
        placeholder="Display Name"
        onChange={e=>setDisplayName(e.target.value)}
        value={displayName}>
      </FormInput>
      <select style={{outline:"none"}} onChange={(e)=>setType(e.target.value)}>
        <option value="singleValue">Single Value</option>
        <option value="multipleValue">Multiple Value</option>
      </select>
      <FormButton 
        style={{marginTop:"10px"}}
        onClick={()=>{
          dispatch(addFieldCategory({
            data:allStructures,
            category,
            value:{
              fieldName,
              displayName,
              dataType:type
            }
          }))
        }}>Add Field</FormButton>
    </Dialog>
      
    
  )
}

export default StructureField
