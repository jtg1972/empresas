import React from 'react'
import { FcTreeStructure } from 'react-icons/fc'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { removeFieldCategory } from '../../../../redux/structure/actions'
//import { getStructureCategory, removeFieldCategory } from '../../../../redux/structure/actions'
const mapToState=({structure,product})=>({
  strCategory:structure.categoryStructure,
  categoryStructures:structure.categoryStructures,
})
const DisplayRow = ({
  f,
  toggleDialogStructure,
  setFieldName,
  setCategory,
  callCategoryStructure
  
  
}) => {
  const {strCategory,categoryStructures}=useSelector(mapToState)
  const dispatch=useDispatch();
  const displayTypes=(values)=>
    values.map(v=>
      <span>{v.name} &nbsp;</span>
    )

  return (
    <tr>
      <td>{f.fieldName}</td>
      <td>{f.displayName}</td>
      <td>{f.dataType=="singleValue"?"Single":"Multiple"}</td>
      <td>{f.values!==undefined && displayTypes(f.values)}</td>
      <td>
        {f.dataType=="multipleValue" &&
        <span>
          <FcTreeStructure
            onClick={()=>{
              toggleDialogStructure()
              setFieldName(f.fieldName);
              setCategory(strCategory.category)
            
              
          }}
            
          />
        </span>
        }
      </td>
      <td style={{textAlign:"center"}}>
        <IoIosRemoveCircleOutline
          onClick={()=>{
            dispatch(removeFieldCategory({
              data:categoryStructures,
              category:strCategory.category,
              fieldName:f.fieldName
            }))
           callCategoryStructure()
          }}
      />
      </td>
    </tr>
  )
  
}

export default DisplayRow
