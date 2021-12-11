import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../../redux/structure/actions';
import DisplayTable from './DisplayTable';
import DisplayTableHeader from './DisplayTableHeader';
const mapToState=({structure})=>({
  productsFromStructure:structure.productsFromStructure,
  fields:structure.fields,
  searchProductsFromStructure:structure.searchProductsFromStructure
})
const DisplayProductsTable = ({
  camposState,
  
  setEditFields,
  toggleEditProductDialog,
  searchProductsFilter,
  values,
  updateData,
  setValues
  
}) => {
  const dispatch=useDispatch();
  const {
    productsFromStructure,
    fields,
    searchProductsFromStructure
  }=
  useSelector(mapToState)

  /*const updateData=()=>{
    if(searchProductsFilter)
      dispatch(fetchFilterResults(values))
  }*/
  return (
    <table>
      <DisplayTableHeader
        fields={fields}
        searchProductsFilter={searchProductsFilter}
      />
      {searchProductsFilter 
      ?
      <DisplayTable
        data={searchProductsFromStructure}
        fields={fields}
        setEditFields={setEditFields}
        toggleEditProductDialog={toggleEditProductDialog}
        searchProductsFilter={searchProductsFilter}
        updateData={updateData}
      />
      :
      <DisplayTable
        data={productsFromStructure}
        fields={fields}
        setEditFields={setEditFields}
        toggleEditProductDialog={toggleEditProductDialog}
        searchProductsFilter={searchProductsFilter}
        values={values}
      />
    }
    </table>
  )
}

export default DisplayProductsTable
