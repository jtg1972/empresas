import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DisplayClients from './DisplayClients'
import DisplayInvoices from './DisplayInvoices'
import DisplayProducts from './DisplayProducts'
import './styles.scss'
const mapToState=({clients})=>({
  allClients:clients.allClients
})

const DisplayClientsBlock = ({
  
  toggleAddClientDialog,
  toggleAddInvoiceDialog,
  toggleSearchClientDialog,
  toggleSearchInvoiceDialog,
  toggleAddProductDialog,
  toggleEditProductDetailDialog,
  clientId,
  setClientId
}) => {
  const {allClients}=useSelector(mapToState)

  
  return (
    <div className="salesWrapper">
      <DisplayClients
        setClientId={setClientId}
        clientId={clientId}
        toggleAddClientDialog={toggleAddClientDialog}
        toggleSearchClientDialog={toggleSearchClientDialog}
      />
      <DisplayInvoices
        clientId={clientId}
        toggleAddInvoiceDialog={toggleAddInvoiceDialog}
        toggleSearchInvoiceDialog={toggleSearchInvoiceDialog}
      />
      <DisplayProducts
        toggleAddProductDialog={toggleAddProductDialog}
        toggleEditProductDetailDialog={toggleEditProductDetailDialog}
      /> 
    </div>
  )
}

export default DisplayClientsBlock
