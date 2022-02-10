import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentClient } from '../../../redux/clients/actions';
import {getStructureClient } from '../../../redux/structure/actions';
import FormButton from '../../Forms/FormButton'
import './styles.scss'
import {AiOutlineSearch} from 'react-icons/ai'
import {IoIosAddCircle} from 'react-icons/io'
import { getInvoicesFromClient, setCurrentInvoice } from '../../../redux/invoices/actions';
import { getInvoiceDetails, setInvoiceDetail } from '../../../redux/invoicesDetails/actions';
import invoicesDetails from '../../../data/invoicesDetails';
const mapToState=({clients,invoices,invoiceDetails})=>({
  allClients:clients.allClients,
  currentClient:clients.currentClient,
  invoicesFromClient:invoices.invoicesFromClient,
  invoiceDetails:invoiceDetails.invoiceDetails,
  currentInvoice:invoices.currentInvoice,
  invoiceDetail:invoiceDetails.invoiceDetail

  
})
const DisplayClients = ({
  setClientId,
  toggleAddClientDialog,
  toggleSearchClientDialog
}) => {
  const {
    allClients,
    currentClient,
    invoicesFromClient,
    invoiceDetails,
    currentInvoice,
    invoiceDetail
  }=useSelector(mapToState)
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(setCurrentClient(allClients[0].id))
  }
  ,[])
  
  useEffect(()=>{
  
      
      dispatch(getInvoicesFromClient(currentClient))
    
  },[currentClient])

  useEffect(()=>{
      

      if(invoicesFromClient.length>0){
        console.log("invfromclient",invoicesFromClient)
        dispatch(getInvoiceDetails(invoicesFromClient[0].id))

        dispatch(setCurrentInvoice(invoicesFromClient[0].id))

        

      }else{
        dispatch(setCurrentInvoice(-1))
      }
      
  },[invoicesFromClient])

  useEffect(()=>{
    if(invoiceDetails.length>0){
      
      dispatch(setInvoiceDetail(invoiceDetails[0].id))
    }else{
      dispatch(setInvoiceDetail(-1))
    }
    console.log("currenclie invoicesfc currinv invdetails,invdetail",
    currentClient,invoicesFromClient,currentInvoice,invoiceDetails,invoiceDetail)

  
  },[currentInvoice])
  console.log("allclients",allClients,currentClient)
  return (

    <div className="clientsWrapper">
      
      <p className="headClient">
        <span style={{marginRight:"5px"}}>Clients</span> 
        <AiOutlineSearch 
          style={{marginRight:"5px"}}
          onClick={toggleSearchClientDialog}/> 
        <IoIosAddCircle 
          style={{
            fontSize:"14px",
            marginRight:"5px"
          }}
          onClick={()=>{
            dispatch(getStructureClient(4))
            toggleAddClientDialog()
           }}
        />
      </p>
    
      {allClients.map(c=>{
        console.log("cid",c.id)
        return <p className={
          c.id==currentClient 
          ?
          "elementClient brownColor"
          :
          "elementClient"
        }
        onClick={()=>{
        
          dispatch(setCurrentClient(c.id))
          //dispatch(getInvoicesFromClient(c.id))
          //setClientId(c.id)
        }}>Id: {c.id} - Name: {c.name}</p>
      }
      )}
    
   
    </div>
  )
}

export default DisplayClients
