import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import structure from '../../data/structure';
import { getFormFields } from '../../redux/structure/actions';
import Dialog from '../Dialog'
import DisplayFields from '../DisplayFields';
import FormButton from '../Forms/FormButton';


const NewProduct = ({
  openDialog,
  toggleDialog,
  catName,
  formFields,
  
}) => {
    const [fields,setFields]=useState({})
    useEffect(()=>{
      setFields({})
    },[formFields])
   return (
    <Dialog
      open={openDialog}
      closeDialog={toggleDialog}
      headline={"Add product of "+catName}>
        {/*<p>HOla new product</p>
        <DisplayFields structure={2}/>*/}
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
        <FormButton onClick={()=>{console.log("fields",fields)}}>
          Crear producto
        </FormButton>
      </Dialog>
  )
}

export default NewProduct
