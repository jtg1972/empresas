import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductCategories } from '../../redux/products/actions'
import { deleteAllFilters, fetchFilterResults, getAllProductsFromCategoryDown } from '../../redux/structure/actions'
import DisplayProductsTable from './DisplayProductsTable'
import DisplayTableHeader from './DisplayTableHeader'
import FormButton from '../Forms/FormButton'

const mapToState=({product,structure})=>({
  productsFromStructure:structure.productsFromStructure,
  categoryObject:product.category,
  subCategories:product.subCategories
})

const DisplayWholeProductsTable = ({
  toggleAddFilterDialog,
  toggleNewProductDialog,
  toggleEditProductDialog,
  setEditFields,
  setSearchProductsFilter,
  searchProductsFilter,
  setShowTable
}) => {
  const dispatch=useDispatch()
  const [camposState,setCamposState]=useState([])
  
  const [values,setValues]=useState({})
  const {
    categoryObject,
    productsFromStructure,
    subCategories,
    
  }=
  useSelector(mapToState)

  const updateData=()=>{
    if(searchProductsFilter==true){
      console.log("vallls",values)
      dispatch(fetchFilterResults(values))
    }
  }
  return (
    <div>
      <DisplayTableHeader
      toggleAddFilterDialog={toggleAddFilterDialog}
      setValues={setValues}
      setSearchProductsFilter={setSearchProductsFilter}
      toggleNewProductDialog={toggleNewProductDialog}
      setShowTable={setShowTable}
      />
      <DisplayProductsTable
        camposState={camposState}
        setEditFields={setEditFields}
        toggleEditProductDialog={toggleEditProductDialog}
        searchProductsFilter={searchProductsFilter}
        setSearchProductsFilter={setSearchProductsFilter}
        
        updateData={updateData}
        
      />
    </div>
  )
}

export default DisplayWholeProductsTable
