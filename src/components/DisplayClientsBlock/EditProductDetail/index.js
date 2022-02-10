import React, { useEffect, useState } from 'react'
import { IoMdFastforward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { editInvoiceDetail, getInvoiceDetails } from '../../../redux/invoicesDetails/actions'
import Dialog from '../../Dialog'
import FormButton from '../../Forms/FormButton'
import FormInput from '../../Forms/FormInput'

const mapToState=({invoiceDetails,structure,invoices})=>({
  invoiceDetail:invoiceDetails.invoiceDetail,
  invoicesDetails:invoiceDetails.invoicesDetails,
  products:structure.products,
  currentInvoice:invoices.currentInvoice
})

const EditProductDetail = ({
  openDialog,
  toggleDialog,
  
}) => {
  const dispatch=useDispatch()
  const [newQuantity,setNewQuantity]=useState()
  const [detail,setDetail]=useState({})
  const [product,setProduct]=useState({})
  const {
    invoiceDetail,
    invoicesDetails,
    products,
    currentInvoice}=
  useSelector(mapToState)

  useEffect(()=>{
    console.log("invdetail",invoiceDetail)
    if(invoiceDetail!==-1){
    const d=invoicesDetails.find(i=>{
      console.log("inde iid",invoiceDetail,i.id)
      return parseInt(invoiceDetail)===parseInt(i.id)
    })
      console.log("d",d)
    setDetail(d)
    if(d){
      const p=products.find(y=>
        parseInt(y.id)==parseInt(d.product))
        console.log("P",p)
      setProduct(p)
      setNewQuantity(d.quantity)
    }
  }
  },[invoiceDetail])
  return (
    <Dialog
      open={openDialog}
      closeDialog={toggleDialog}
    >
      <p> 
        Product Name: {product.name}
      </p>
      <p>Product Price: {product.price}</p>
      <FormInput 
        type="number"
        onChange={(e)=>setNewQuantity(e.target.value)}
          
        placeholder="Quantity"
        value={newQuantity}
        //value={getQtyIfExists()}
      /> 
      <FormButton 
        onClick={
          ()=>{
            dispatch(editInvoiceDetail({id:invoiceDetail,quantity:newQuantity}))  
            //dispatch(getInvoiceDetails(currentInvoice))
            toggleDialog()
          }
      }>
        Edit invoice detail
      
      </FormButton>
      
    </Dialog>)
    
}

export default EditProductDetail
