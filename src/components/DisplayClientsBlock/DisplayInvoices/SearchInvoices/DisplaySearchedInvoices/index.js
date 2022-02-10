import React from 'react'
import { useDispatch } from 'react-redux';
import { getInvoicesFromClient, setCurrentInvoice } from '../../../../../redux/invoices/actions';
import { getInvoiceDetails } from '../../../../../redux/invoicesDetails/actions';
import './styles.scss'
const mapToState=({invoices})=>({
  currentInvoice:invoices.currentInvoice
})

const DisplaySearchedInvoices= ({
  searchedInvoices,
  toggleDialog
  
}) => {
  const dispatch=useDispatch()
return(
  searchedInvoices.length>0 
  && 
  <div className="containerCombo">
    <div className="scrollCombo">
    {searchedInvoices.map((sc,i)=>
      <div 
        className="combo"
        key={i}
        onClick={()=>{
          dispatch(setCurrentInvoice(sc.id))
          dispatch(getInvoiceDetails(sc.id))
          toggleDialog()
        }}
      >
        {sc.id} 
      </div>)}
    </div>
  </div>
)
}

export default DisplaySearchedInvoices
