import React from 'react'
import { useDispatch } from 'react-redux';

import './styles.scss'

const DisplaySearchProducts = ({
  searchedProducts,
  toggleDialog,
  setSearchProductType,
  setChosenProduct
}) => {
  const dispatch=useDispatch()
  console.log("searchedproducts",searchedProducts)
  const displayRow=(sc)=>{
    const values=Object.keys(sc).map(k=> {
      if(k!=="id" && k!=="category" && k!=="price")
        return sc[k]
      else if(k=="price")
        return "$"+sc[k]
      else
        return null
    })
    console.log("values",values)
    const v=values.filter(a=>a!==null)
    console.log("v",v)
    return v.join(", ")
  }
return(
  searchedProducts.length>0 
  && 
  <div className="containerCombo">
    <div className="scrollCombo">
    {searchedProducts.map((sc,i)=>
      <div 
        className="combo"
        key={i}
        onClick={()=>{
          //dispatch(setCurrentClient(sc.id))
          //dispatch(getInvoicesFromClient(sc.id))
          //toggleDialog()
          setSearchProductType(false)
          setChosenProduct(sc)
        }}
      >

        {displayRow(sc)} 
      </div>)}
    </div>
  </div>
)
}

export default DisplaySearchProducts
