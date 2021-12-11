import React from 'react'
import { useSelector } from 'react-redux';
import DisplayHeader from './DisplayHeaderTable';
import DisplayRow from './DisplayRow';
const mapToState=({structure,product})=>({
  strCategory:structure.categoryStructure,
})

const DisplayCategoryFieldsTable = ({
  toggleDialogStructure, 
  setFieldName,
  setCategory,
}
) => {
  const {strCategory}=useSelector(mapToState)
  return (
    strCategory!==undefined 
    && 
    <div>
      <table>
        <DisplayHeader/>
        
        {strCategory.fields && strCategory.fields.length>0
        && strCategory.fields.map(f=>
          <DisplayRow 
            f={f}
            toggleDialogStructure={toggleDialogStructure}
            setFieldName={setFieldName}
            setCategory={setCategory}
          />)}
      </table>
      
    </div>
      

  )
}

export default DisplayCategoryFieldsTable
