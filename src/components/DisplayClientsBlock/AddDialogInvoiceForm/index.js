import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../../Dialog'
import DisplayFields from '../../DisplayFields';
import FormButton from '../../Forms/FormButton';
import {addClient} from '../../../redux/clients/actions'
import { addInvoice } from '../../../redux/invoices/actions';
import { getStructureCategory, getStructureClient } from '../../../redux/structure/actions';
const mapToState=({structure,invoices,clients})=>({
  invoiceAmount:invoices.allInvoices.length,
  formFields:structure.formFields,
  currentClient:clients.currentClient,
  structureClient:structure.structureClient,
  allInvoices:invoices.allInvoices,
  
})

const AddDialogInvoiceForm = ({
  openDialog,
  toggleDialog,
  setCategory,
  clientId
  
}) => {
  const dispatch=useDispatch()
  const {
    invoiceAmount,
    formFields,
    currentClient,
    structureClient,
    allInvoices
  }
  =useSelector(mapToState)
  
  const [fields,setFields]=useState({})
  useEffect(()=>{
    dispatch(getStructureClient(5))
  },[])

  useEffect(()=>{
    setFields({})
  },[structureClient])

  const buttonClick=()=>{ 
    if(currentClient>-1){
    dispatch(addInvoice({
      id:invoiceAmount+1,
      category:5,
      client:currentClient,
      ...fields
    }))
    }
    console.log("allINvoices",allInvoices)
    toggleDialog();
    setFields({})
  }

  const dialogConfig={
    open:openDialog,
    closeDialog:toggleDialog,
    headline:
      "Add Entity of Invoice"
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
      
        <DisplayFields
          {...displayFieldsConfig(structureClient)} 
        />
      <FormButton {...formButtonConfig}>
        Create Invoice
      </FormButton>
    </Dialog>
  )
}

export default AddDialogInvoiceForm

