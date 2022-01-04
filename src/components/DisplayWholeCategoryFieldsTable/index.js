import React from 'react'
import { useSelector } from 'react-redux'
import DisplayCategoryFieldsTable from './DisplayCategoryFieldsTable'
import FormButton from '../Forms/FormButton'

const mapToState=({product,structure})=>({
  categoryObject:product.category,
  strCategory:structure.categoryStructure
})

const DisplayWholeCategoryFieldsTable = ({
  toggleDialogField,
  toggleDialogStructure,
  setFieldName,
  setCategory,
  callCategoryStructure,
}) => {
  const {
    categoryObject,
    strCategory
  }=useSelector(mapToState)
  return (
    <div>
      <FormButton 
        className="addFirstButton"
        onClick={()=>toggleDialogField()}
      >
          Anadir campo a {categoryObject.name}
      </FormButton>
      {strCategory!==undefined && 
    
    
      <DisplayCategoryFieldsTable
        toggleDialogStructure={toggleDialogStructure}
        setFieldName={setFieldName}
        setCategory={setCategory}
        callCategoryStructure={callCategoryStructure}
      />
      }
    </div>
  )
}

export default DisplayWholeCategoryFieldsTable
