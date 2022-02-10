import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../../Dialog'
import DisplayFields from '../../DisplayFields';
import FormButton from '../../Forms/FormButton';
import {addClient} from '../../../redux/clients/actions'
import { getStructureClient } from '../../../redux/structure/actions';
const mapToState=({structure,clients,product})=>({
  clientsAmount:clients.allClients.length,
  //formFields:structure.formFields,
  //categoryObject:product.category,
  structureClient:structure.structureClient
})

const AddDialogClientForm = ({
  openDialog,
  toggleDialog,
  setCategory
  
}) => {
  const dispatch=useDispatch()
  const {
    clientsAmount,
    //formFields,
    structureClient
  }
  =useSelector(mapToState)
  
  const [fields,setFields]=useState({})

  console.log("strcl",structureClient)

  useEffect(()=>{
    dispatch(getStructureClient(4))
  },[])

  useEffect(()=>{
    
    setFields({})
  },[structureClient])

  const buttonClick=()=>{ 
    dispatch(addClient({
      id:clientsAmount+1,
      category:4,
      ...fields
    }))
    
    toggleDialog();
    setFields({})
  }

  const dialogConfig={
    open:openDialog,
    closeDialog:toggleDialog,
    headline:"Add Entity of Client"
  }

  const displayFieldsConfig=(ff)=>({
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
      
      
      <DisplayFields
        {...displayFieldsConfig(structureClient)} 
      />
      
      
      <FormButton {...formButtonConfig}>
        Create Client
      </FormButton>
    </Dialog>
  )
}

export default AddDialogClientForm

