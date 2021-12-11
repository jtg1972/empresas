import React,{useState,useEffect} from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { editProduct } from '../../redux/structure/actions'
import Dialog from '../Dialog'
import DisplayFields from '../DisplayFields'
import FormButton from '../Forms/FormButton'

const mapToState=({structure})=>({
  formFields:structure.formFields
})

const EditProduct = ({
  openDialog,
  toggleDialog,
  editFields,
  updateData,
}) => {
  const dispatch=useDispatch()
  const [fields,setFields]=useState({})
  const {formFields}=useSelector(
    mapToState
  )
 
  useEffect(()=>{
    setFields(editFields)
  },[editFields])

  const formButtonClick=()=>{
    dispatch(editProduct({
      id:editFields.id,
      category:editFields.category,
      ...fields
    }))
    toggleDialog()
    updateData()
  }

  const dialogConfig={
    headline:"Edit Product", 
    open:openDialog,
    closeDialog:toggleDialog
  }

  const displayFieldsConfig=(ff,index)=>({
    key:index,
    structure:ff,
    fields:fields,
    setFields:setFields
  })

  const formButtonConfig={
    onClick:()=>formButtonClick()
  }
  return (
    <Dialog {...dialogConfig}>
      {formFields.map((ff,index)=>(
        <DisplayFields 
          {...displayFieldsConfig(ff,index)}
          />
      ))}
        <FormButton {...formButtonConfig}>
          Edit producto
        </FormButton>
    </Dialog>
  )
}

export default EditProduct
