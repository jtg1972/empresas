import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMultipleValue, fetchAllStructures } from '../../redux/structure/actions'
import Dialog from '../Dialog'
import FormInput from '../Forms/FormInput'

const mapToState=({product})=>({
  categoryObject:product.category
})

const StructureCategory = ({
  openDialog,
  toggleDialog,
  category,
  multipleFieldName,
  callCategoryStructure
}) => {
  
  const [mvInstance,setMvInstance]=useState("")
  const dispatch=useDispatch();
  const {categoryObject}=useSelector(mapToState)
  

  const addMultipleValueClick=()=>{
    dispatch(addMultipleValue({
      category,
      multipleField:multipleFieldName,
      value:{
        name:mvInstance,
        value:mvInstance
      }
    }))
  }

  const dialogConfig={
    headline:categoryObject.name + " - "+ multipleFieldName, 
    open:openDialog, 
    closeDialog:toggleDialog
  }

  const formInputConfig={
    placeholder:"New instance of multiple value",
    value:mvInstance,
    onChange:(e)=>setMvInstance(e.target.value),
    onKeyUp:(e)=>{
      if(e.key=="Enter"){
        addMultipleValueClick() 
        callCategoryStructure()    
      }
    }
  }

  return (
    <Dialog 
      {...dialogConfig}
    >
      <FormInput
        {...formInputConfig}    
      ></FormInput>  
    </Dialog>
  )
}
 
export default StructureCategory
