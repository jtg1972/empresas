import React, { useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosAddCircle } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { getInvoicesFromClient, setCurrentInvoice } from '../../../redux/invoices/actions'
import { getInvoiceDetails } from '../../../redux/invoicesDetails/actions'
import { getStructureClient } from '../../../redux/structure/actions'
import FormButton from '../../Forms/FormButton'
import './styles.scss'
const mapToState=({invoices,clients})=>({
  allInvoices:invoices.allInvoices,
  invoicesFromClient:invoices.invoicesFromClient,
  currentInvoice:invoices.currentInvoice,
  currentClient:clients.currentClient
})

const DisplayInvoices = ({
  clientId,
  toggleAddInvoiceDialog,
  toggleSearchInvoiceDialog,
  setClientId
}) => {
  const dispatch=useDispatch()
  const {
    allInvoices,
    invoicesFromClient,
    currentInvoice,
    currentClient}=useSelector(mapToState)

  return (
    <div className="invoicesWrapper">
      <p className="header">Invoices for Client id: {currentClient} 
        <AiOutlineSearch 
            style={{marginLeft:"5px",marginRight:"5px"}}
            onClick={toggleSearchInvoiceDialog}/> 
        <IoIosAddCircle
          style={{
            fontSize:"14px",
            marginRight:"5px"
          }}
          onClick={()=>{
            dispatch(getStructureClient(5))
            toggleAddInvoiceDialog()
        
            }}
        />
      </p>
      {invoicesFromClient.map(a=>
          <p className={a.id==currentInvoice 
          ?
          "elementClient brownColor"
          :
          "elementClient"}
          onClick={()=>{
            dispatch(setCurrentInvoice(a.id))
            dispatch(getInvoiceDetails(a.id))
          }
          }>Id: {a.id} - Created: {a.createdDate.toDateString()}</p>)}

      </div>
  )
}

export default DisplayInvoices
