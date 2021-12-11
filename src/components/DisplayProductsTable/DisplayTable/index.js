import React from 'react'
import { BsPencilFill } from 'react-icons/bs';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { deleteAllFilters, deleteProduct, fetchFilterResults } from '../../../redux/structure/actions';

const DisplayTable = ({
  data,
  fields,
  setEditFields,
  toggleEditProductDialog,
  searchProductsFilter,
  values,
  updateData,
}) => {
  const dispatch=useDispatch()
  return (
    data.map(pfs=>
      (
      <tr>
        {fields.map(c=>c.map(x=>
          <td>{pfs[x]}</td>))
        }
        <td style={{textAlign:"center"}}
          onClick={()=>{
            setEditFields(pfs)
            toggleEditProductDialog();
            //setSearchProductsFilter(false)
            //dispatch(deleteAllFilters())
            
          }}>
          <BsPencilFill></BsPencilFill>
        </td>
        <td style={{textAlign:"center"}}>
          <IoIosRemoveCircleOutline
          onClick={()=>{
            dispatch(deleteProduct({
              id:pfs.id,
              category:pfs.category

            }))
            if(updateData)
              updateData()
            
            
            
          }}/></td>
        
      </tr>
      ))
  )
}

export default DisplayTable
