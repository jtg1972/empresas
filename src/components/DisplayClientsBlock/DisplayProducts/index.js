import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentClient } from '../../../redux/clients/actions';
import {getProductsFromStructure, getStructureClient } from '../../../redux/structure/actions';
import FormButton from '../../Forms/FormButton'
import './styles.scss'
import {AiOutlineSearch} from 'react-icons/ai'
import {IoIosAddCircle} from 'react-icons/io'
import { getInvoicesFromClient } from '../../../redux/invoices/actions';
import { deleteInvoiceDetail, setInvoiceDetail } from '../../../redux/invoicesDetails/actions';
const mapToState=({structure,invoiceDetails,invoices})=>({
  //allClients:clients.allClients,
  currentInvoice:invoices.currentInvoice,
  invoiceDetails:invoiceDetails.invoiceDetails,
  products:structure.products,
  invoiceDetail:invoiceDetails.invoiceDetail
})
const DisplayProducts = ({
  //setClientId,
  toggleAddProductDialog,
  toggleEditProductDetailDialog
  //toggleSearchClientDialog
}) => {
  const {
    //allClients,
    invoiceDetails,
    currentInvoice,
    products,
    invoiceDetail
  }=useSelector(mapToState)
  console.log("invdetails",invoiceDetails)
  const dispatch=useDispatch();

  const getProduct=id=>{
    return products.find(p=>p.id==id)
  }
  /*console.log("allclients",allClients,currentClient)*/
  return (

    <div className="productsWrapper">
      
      <p className="headClient">
        <span style={{marginRight:"5px"}}>Products</span> 
        <IoIosAddCircle 
          style={{marginRight:"5px"}}
          onClick={toggleAddProductDialog}/> 
        {/*<IoIosAddCircle 
          style={{
            fontSize:"14px",
            marginRight:"5px"
          }}
          onClick={()=>{
            dispatch(getStructureClient(4))
            toggleAddClientDialog()
           }}
          />*/}
      </p>
    
     {invoiceDetails.map(c=>{
        console.log("cid",c.id)
        const p=getProduct(c.product)
        return <p className={
          c.id==invoiceDetail 
          ?
          "elementClient brownColor"
          :
          "elementClient"
        }
        onClick={()=>dispatch(setInvoiceDetail(c.id))
        }
        >Id: {c.id} - Name: {p.name} - Price: {p.price} - Quantity: {c.quantity} - Total: {p.price*c.quantity}
        <span onClick={()=>{
          toggleEditProductDetailDialog()
        }}> Edit </span>
        <span onClick={()=>{
          dispatch(deleteInvoiceDetail(c.id))
        }}> Delete </span>
        </p>
      })}
      
    </div>
  )
}

export default DisplayProducts
