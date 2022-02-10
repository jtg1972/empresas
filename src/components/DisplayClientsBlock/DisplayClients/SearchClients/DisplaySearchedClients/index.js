import React from 'react'
import { useDispatch } from 'react-redux';
import { setCurrentClient } from '../../../../../redux/clients/actions';
import { getInvoicesFromClient } from '../../../../../redux/invoices/actions';


const DisplaySearchedClients = ({
  searchedClients,
  toggleDialog
  
}) => {
  const dispatch=useDispatch()
return(
  searchedClients.length>0 
  && 
  <div className="containerCombo">
    <div className="scrollCombo">
    {searchedClients.map((sc,i)=>
      <div 
        className="combo"
        key={i}
        onClick={()=>{
          dispatch(setCurrentClient(sc.id))
          dispatch(getInvoicesFromClient(sc.id))
          toggleDialog()
        }}
      >
        {sc.name} 
      </div>)}
    </div>
  </div>
)
}

export default DisplaySearchedClients
