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

  const displayDatatypeTitle=()=>{
    console.log("fffffff",f["dataType"]["relation"])
    if(f.dataType=="singleValue"){
      return "Single"
    }else if(f.dataType=="multipleValue"){
      return "Multiple"
    }else if(Object.keys(f.dataType).length>0){
      console.log("fdatype",f["dataType"]["relation"])
      if(f["dataType"]["relation"]=="relation1toM"){
        return "Relation 1 to M"
      }
      else if(f["dataType"]["relation"]=="relation1to1"){
        return "Relation 1 to 1"
      }
    }
  }  
  return (
    <tr>
      <td>{f.fieldName}</td>
      <td>{f.displayName}</td>
      <td>{displayDatatypeTitle()}</td>
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
