import React from 'react'
import { BsPencilFill } from 'react-icons/bs';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { deleteAllFilters, deleteProduct, fetchFilterResults } from '../../../redux/structure/actions';
import './styles.scss'
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
  console.log("fieldsleng",fields.length,fields)
  return (
    fields.length==1 && 
    fields[0].length==0 ? "": <table>
      <tr>
        {fields.map(f=>{
          return f.map(x=><th>{x}</th>)
        })}
        <th>Editar producto</th>
        <th>Eliminar producto</th>
      </tr>
    {data.map(pfs=>
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
        }
    </table>
  )
}

export default DisplayTable
