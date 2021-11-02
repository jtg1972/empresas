import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMultipleValue, fetchAllStructures } from '../../redux/structure/actions'
import Dialog from '../Dialog'
import FormInput from '../Forms/FormInput'

const mapToState=({structure})=>{
  console.log("structure",structure)
   return {
      categoryStructures:structure.categoryStructures
  }
}

const StructureCategory = ({
  openDialog,
  toggleDialog,
  catName,
  category,
  multipleFieldName
  }) => {
  
  const [mvInstance,setMvInstance]=useState("")
  const dispatch=useDispatch();
  const {categoryStructures}=useSelector(mapToState)
  /*useEffect(()=>{
    dispatch(fetchAllStructures());
  },[])*/

  return (
    <Dialog 
      headline={catName + " - "+ multipleFieldName} 
      open={openDialog} 
      closeDialog={toggleDialog}>
      <FormInput
        placeholder="New instance of multiple value"
        value={mvInstance}
        onChange={(e)=>setMvInstance(e.target.value)}
        onKeyUp={(e)=>{
          if(e.key=="Enter"){
            dispatch(addMultipleValue({
              data:categoryStructures,
              category,
              multipleField:multipleFieldName,
              value:{
                name:mvInstance,
                value:mvInstance
              }
            }))
          }
        }}
      ></FormInput>
      
    </Dialog>
  )
}
 
export default StructureCategory
