import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../../Dialog'
import DisplayFields from '../../DisplayFields';
import FormButton from '../../Forms/FormButton';
import {addClient} from '../../../redux/clients/actions'
import { addInvoice, getInvoicesFromClient } from '../../../redux/invoices/actions';
import { cleanSearchProductsFromClient, getStructureCategory, getStructureClient, searchProductsFromClient } from '../../../redux/structure/actions';
import FormInput from '../../Forms/FormInput';
import DisplaySearchProducts from './DisplaySearchProducts';
import { createInvoiceDetail, editInvoiceDetail, getInvoiceDetails } from '../../../redux/invoicesDetails/actions';
const mapToState=({structure,invoices,invoiceDetails,clients})=>({
  //invoiceAmount:invoices.allInvoices.length,
  //formFields:structure.formFields,
  //currentClient:clients.currentClient,
  //structureClient:structure.structureClient,
  //allInvoices:invoices.allInvoices,
  searchedProducts:structure.searchedProductsFromClient,
  currentInvoice:invoices.currentInvoice,
  invoicesDetailTotal:invoiceDetails.invoicesDetails.length,
  invoiceDetails:invoiceDetails.invoiceDetails
})

const AddDialogProductForm = ({
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
    allInvoices,
    searchedProducts,
    invoicesDetailTotal,
    currentInvoice,
    invoiceDetails
  }
  =useSelector(mapToState)
  
  const [search,setSearch]=useState({})
  const [searchProductType,setSearchProductType]=useState(true)
  const [chosenProduct,setChosenProduct]=useState({})
  const [fields,setFields]=useState({})
  console.log("sclient",structureClient)
  useEffect(()=>{
    dispatch(getStructureClient(6))
  },[])

  useEffect(()=>{
   setFields({})
  },[structureClient])

  const buttonClick=()=>{ 
    /*if(currentClient>-1){
    dispatch(addInvoice({
      id:invoiceAmount+1,
      category:5,
      client:currentClient,
      ...fields
    }))
    }
    console.log("allINvoices",allInvoices)
    toggleDialog();*/
    dispatch(searchProductsFromClient(search))
    //setFields({})
    
    console.log("spfcreact",searchedProducts)
  }

  const dialogConfig={
    open:openDialog,
    closeDialog:()=>{
      setSearchProductType(true)
      toggleDialog()
      dispatch(cleanSearchProductsFromClient())
    },
    headline:
      "Add Product to Invoice"
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
  const getQtyIfExists=()=>{
    const exists=invoiceDetails.find(e=>
      e.product==chosenProduct.id &&
      e.invoice==currentInvoice)
    if(exists) 
      return exists.id 
    else 
    return false
  }
   return (
    <Dialog
      {...dialogConfig}
    >
      {searchProductType==true?
      (
        <>
      <FormInput 

        placeholder="Type product features"
       onChange={(e)=>setSearch(e.target.value)}
      />
      <DisplaySearchProducts
        searchedProducts={searchedProducts}
        setSearchProductType={setSearchProductType}
        setChosenProduct={setChosenProduct}
      />
    {/*<DisplayFields
          {...displayFieldsConfig(structureClient)} 
    />*/}
      <FormButton {...formButtonConfig}>
        Search Product
      </FormButton>
      </>
      ):(
      <>
        <p 
          onClick={()=>{
            setSearchProductType(true)
          }}>Product Name: {chosenProduct.name}
        </p>
        <p>Product Price: {chosenProduct.price}</p>
        <FormInput 
          type="number"
          onChange={(e)=>setFields({...fields,quantity:e.target.value})}
            
          placeholder="Quantity"
          //value={getQtyIfExists()}
        /> 
        <FormButton onClick={
        ()=>{
          const r=getQtyIfExists()
          if(!r){
            dispatch(createInvoiceDetail({
              invoice:currentInvoice,
              quantity:fields["quantity"],
              category:6,
              product:chosenProduct.id,
              id:invoicesDetailTotal+1
            }))
            
          }else{
            dispatch(editInvoiceDetail({id:r,quantity:fields["quantity"]}))

          }
          dispatch(getInvoiceDetails(currentInvoice))
          dispatch(cleanSearchProductsFromClient())
          setSearchProductType(true)
        }
      }>{!getQtyIfExists()?"Create Invoice Detail":"Edit invoice detail"}</FormButton>
        {/*<DisplayFields 
          structure={structureClient}
          fields={fields}
        setFields={setFields} />*/}
      </>)}
      
    </Dialog>
  )
}

export default AddDialogProductForm

