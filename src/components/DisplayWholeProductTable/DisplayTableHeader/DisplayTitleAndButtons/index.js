import React, { useEffect,useState } from 'react'
import FormButton from '../../../Forms/FormButton'
import DisplayTitle from './DisplayTitle'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllFilters, getAllProductsFromCategoryDown } from '../../../../redux/structure/actions'
import { getProductCategories } from '../../../../redux/products/actions'
import { getReport, runReport, selectCategoryReports } from '../../../../redux/reports/actions'
import structure from '../../../../data/structure'

const mapToState=({product,reports,structure})=>({
  subCategories:product.subCategories,
  categoryObject:product.category,
  categoryReports:reports.categoryReports,
  report:reports.report,
  productsFromStructure:structure.productsFromStructure
})

const DisplayTitleAndButtons = ({
  toggleAddFilterDialog,
  setValues,
  setSearchProductsFilter,
  toggleNewProductDialog,
  setShowTable

}) => {
  const dispatch=useDispatch()
  const {
    subCategories,
    categoryObject,
    categoryReports,
    report,
    productsFromStructure}
    =
  useSelector(mapToState)
  const [reportName,setReportName]=useState("")
  useEffect(()=>{
    dispatch(selectCategoryReports(categoryObject.id))
  },[categoryObject])
  return (
    <div>
      <DisplayTitle/>
      <FormButton
        className="addFirstButton" 
        onClick={()=>toggleAddFilterDialog()}>
          Add Filter
      </FormButton>

      <FormButton 
        className="addSecondButton" 
        onClick={()=>{
          dispatch(deleteAllFilters())
          setValues({})
          setSearchProductsFilter(false)
          dispatch(getProductCategories(categoryObject.category))
          dispatch(getAllProductsFromCategoryDown({subCategories}))
        }}>
        Delete All Filters
      </FormButton>
      {categoryObject.type==0 && 
      <FormButton className="addSecondButton"
        onClick={()=>
          toggleNewProductDialog()
        }>
        Anadir producto a {categoryObject.name}
      </FormButton>
      }
      <select onChange={(e)=>
        setReportName(e.target.value)
      }>
        {categoryReports.map(x=>
          <option value={x.name}>{x.name}</option>)}
      </select>
      <FormButton
        onClick={()=>{
        dispatch(getReport(reportName))
        dispatch(runReport(
          productsFromStructure,
          
        ))
        setShowTable(true)
      }}
      >
        Start report
      </FormButton>
      
    </div>
  )
}

export default DisplayTitleAndButtons
