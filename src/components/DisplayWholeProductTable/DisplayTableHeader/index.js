import React from 'react'
import DisplayTitleAndButtons from './DisplayTitleAndButtons'

const DisplayTableHeader = ({
  fields,
  searchProductsFilter,
  toggleAddFilterDialog,
  setValues,
  setSearchProductsFilter,
  toggleNewProductDialog

}) => {
  return (
  
      <DisplayTitleAndButtons
      toggleAddFilterDialog={toggleAddFilterDialog}
      setValues={setValues}
      setSearchProductsFilter={setSearchProductsFilter}
      toggleNewProductDialog={toggleNewProductDialog}
      />)
  }
    
      
  

export default DisplayTableHeader
