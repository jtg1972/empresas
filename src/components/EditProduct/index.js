import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { editProduct } from '../../redux/structure/actions'
import Dialog from '../Dialog'
import DisplayFields from '../DisplayFields'
import FormButton from '../Forms/FormButton'

const EditProduct = ({
  openDialog,
  toggleDialog,
  fieldsJson,
  formFields}) => {
  const dispatch=useDispatch()
  const [fields,setFields]=useState({})
  useEffect(()=>{
    setFields(fieldsJson)
  },[fieldsJson])
  console.log("fields",fieldsJson)
  return (
    <Dialog headline="Edit Product" open={openDialog} closeDialog={toggleDialog}>
      {formFields.map((ff,index)=>{
          console.log("ff",ff.id)
          return (
            <DisplayFields 
              key={index} 
              structure={ff}
              fields={fields}
              setFields={setFields}/>
          )
        })}
        <FormButton onClick={()=>{
          console.log("fields",fields)
          dispatch(editProduct({
            id:fieldsJson.id,
            category:fieldsJson.category,
            ...fields
          }))
          //dispatch(getProductsFromStructure({category}))
          
        }}>
          Edit producto
        </FormButton>
    </Dialog>
  )
}

export default EditProduct
