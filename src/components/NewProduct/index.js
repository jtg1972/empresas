import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFromStructure,addProduct } from '../../redux/structure/actions';
import Dialog from '../Dialog'
import DisplayFields from '../DisplayFields';
import FormButton from '../Forms/FormButton';

const mapToState=({structure,product})=>({
  productsAmount:structure.products.length,
  formFields:structure.formFields,
  categoryObject:product.category
})

const NewProduct = ({
  openDialog,
  toggleDialog,
  
}) => {
  const dispatch=useDispatch()
  const {
    categoryObject,
    productsAmount,
    formFields}
  =useSelector(mapToState)
  
  const [fields,setFields]=useState({})
  
  useEffect(()=>{
    setFields({})
  },[formFields])

  const buttonClick=()=>{ 
    dispatch(addProduct({
      id:productsAmount+1,
      category:categoryObject.id,
      ...fields
    }))
    toggleDialog();
    setFields({})
  }

  const dialogConfig={
    open:openDialog,
    closeDialog:toggleDialog,
    headline:
      "Add product of "+
      categoryObject.name
  }

  const displayFieldsConfig=(ff,index)=>({
    key:index,
    structure:ff,
    fields,
    setFields:setFields
  })

  const formButtonConfig={
    onClick:()=>buttonClick()
  }
   return (
    <Dialog
      {...dialogConfig}
    >
      {formFields.map((ff,index)=>(
        <DisplayFields
          {...displayFieldsConfig(ff,index)} 
        />
        )
      )}
      <FormButton {...formButtonConfig}>
        Crear producto
      </FormButton>
    </Dialog>
  )
}

export default NewProduct
