import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumb from '../../components/Breadcrumb'
import FormButton from '../../components/Forms/FormButton'
import FormInput from '../../components/Forms/FormInput'
import SearchSubcategories from '../../components/SearchSubcategories'
import ShowReport from '../../components/ShowReport'
import { fetchCategories } from '../../redux/products/actions'
import { addQueryField, addQueryGroup, createReport, removeQueryField, removeQueryGroup } from '../../redux/reports/actions'
import { getStructureCategory } from '../../redux/structure/actions'
import NumberGroupRegularIntervalDialog from './NumberGroupRegularIntervalDialog'
import './styles.scss'

const mapToState=({structure,product,reports})=>({
  strCategory:structure.categoryStructure,
  formFields:structure.formFields,
  productsFromStructure:structure.productsFromStructure,
  fields:structure.fields,
  subCategories:product.subCategories,
  categoryObject:product.category,
  breadCrumb:product.breadCrumb,
  categories:product.categories,
  //queryGroups:reports.queryGroups
  queryFields:reports.queryFields,
  queryGroups:reports.queryGroups
})



const Reports = () => {
  const [category,setCategory]=useState(0)
  
  
  const [reportName,setReportName]=useState("")
  
  const [openDialog,setOpenDialog]=useState(false)
  const toggleDialog=()=>setOpenDialog(!openDialog)
  const [openRegularIntervalDialog,setOpenRegularIntervalDialog]=useState(false)
  const toggleRegularIntervalDialog=()=>setOpenRegularIntervalDialog(!openRegularIntervalDialog)
  const [intervalRange,setIntervalRange]=useState(0)

  const [field,setField]=useState({})
  const dispatch=useDispatch()
  
  const {
    breadCrumb,
    subCategories,
    formFields,
    fields,
    categoryObject,
    reports,
    queryFields,
    queryGroups}
    =useSelector(mapToState)
  
    const callCategoryStructure=()=>{
    dispatch(getStructureCategory({category,subCategories,breadCrumb}))
  }
  useEffect(()=>{
    dispatch(fetchCategories(category))
  },[category])

  useEffect(()=>{
    //dispatch(getStructureCategory({category,subCategories,breadCrumb}))
    callCategoryStructure()
  },[breadCrumb,subCategories,category])
  
  
  const searchSubcategoriesProps={
    category,
    setCategory,
    toggleDialog,
    openDialog
  }
  return (
    <div className="reports">
    
      <Breadcrumb
        category={category}
        setCategory={setCategory}
        toggleDialog={toggleDialog}
      />
      
      Create Reports of {categoryObject.name}
      <div className="form">
        <FormInput 
          onChange={(e)=>
            setReportName(e.target.value)
          }
          value={reportName}
          placeholder="Report Name"
        />
        
      
      <div style={{display:"flex"}}>
        <div style={{flex:"1"}}>
          <p>Select the fields:</p>
          {formFields.map(v=>v.fields.map(x=>
            <p style={{display:"flex",alignItems:"center"}}>
            <input style={{
                marginRight:"5px"
              }} 
              type="checkbox"
              onChange={e=>{
                if(e.target.checked==true)
                  dispatch(addQueryField(x))
                else{
                  dispatch(removeQueryField(x.fieldName))
                }
                console.log("targe",e.target.checked)
                //console.log("qf",queryFields)
              }}
            /> 
              {x.fieldName}
            </p>
          ))}
        </div>
        <div style={{flex:2,display:"flex"}}>
          <div>
            <p>Select the groups:</p>
            {formFields.map(v=>v.fields.map(x=>
              <p style={{display:"flex",alignItems:"center"}}>
                <input 
                  style={{marginRight:"5px"}} 
                  type="checkbox"
                  onChange={e=>{
                    if(e.target.checked==true){
                      if(x["declaredType"]!="number"){
                      
                        
                        dispatch(addQueryGroup(x))
                      }else if(x["declaredType"]=="number"){
                        console.log("number")
                        setField(x)
                        toggleRegularIntervalDialog()
                      }

                    }
                    else{
                      dispatch(removeQueryGroup(x.fieldName))
                    }
                    console.log("targe",e.target.checked)
                    //console.log("qf",queryFields)
                  }}
                  /> 
                  {x.fieldName}
              </p>
            ))}
          </div>
          <div>
            <p>Order of the groups:</p>
            {queryGroups.map(v=><p>{v.fieldName}</p>
            )}
          </div>
        </div>
      </div>
      <FormButton onClick={
        ()=>dispatch(createReport({
          name:reportName,
          category:categoryObject.id,
          queryFields,
          queryGroups,
        }))
      }>Create Report</FormButton>
    </div>
    
      <SearchSubcategories
        {...searchSubcategoriesProps}
      />
      <NumberGroupRegularIntervalDialog
        openDialog={openRegularIntervalDialog}
        toggleDialog={toggleRegularIntervalDialog}
        intervalRange={intervalRange}
        setIntervalRange={setIntervalRange}
        field={field}
      />

      
      
      

    </div>
  )
}

export default Reports
