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
  callCategoryStructure,
}
) => {
  const {strCategory}=useSelector(mapToState)
  return (
    (strCategory!==undefined && strCategory.fields 
    && strCategory.fields?.length>0)
    ?
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
            callCategoryStructure={callCategoryStructure}
          />)}
      </table>
      
    </div>
     :"" 

  )
}

export default DisplayCategoryFieldsTable
