import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormButton from '../../components/Forms/FormButton'
import { getFormFields, getStructureCategory,getProductsFromStructure, getAllProductsFromCategoryDown, deleteAllFilters, addFieldCriteria, fetchFilterResults } from '../../redux/structure/actions'
import './styles.scss'
import { fetchCategories, getProductCategories } from '../../redux/products/actions'
import Breadcrumb from '../../components/Breadcrumb'
import DialogsOfProductsDetails from '../../components/DialogsOfProductsDetails'
import DisplayWholeCategoryFieldsTable from '../../components/DisplayWholeCategoryFieldsTable'
import DisplayWholeProductsTable from '../../components/DisplayWholeProductTable'
import ShowReport from '../../components/ShowReport'

const mapToState=({structure,product})=>({
  strCategory:structure.categoryStructure,
  formFields:structure.formFields,
  productsFromStructure:structure.productsFromStructure,
  fields:structure.fields,
  subCategories:product.subCategories,
  categoryObject:product.category,
  breadCrumb:product.breadCrumb,
  categories:product.categories,
})

const DetailedProduct = () => {
  const dispatch=useDispatch();
  const {
    strCategory,
    formFields,
    productsFromStructure,
    subCategories,
    fields,
    categoryObject,
    breadCrumb,
  }=useSelector(mapToState)
  const [category,setCategory]=useState(0)
  //const [catName,setCatName]=useState("")
  const [hasAddFilter,setHasAddFilter]=useState(false)
  /*const [breadCrumb,setBreadCrumb]=useState([{
    id:0,
    name:"Categories"
  }]);*/
  const [fieldName,setFieldName]=useState("");
  //variables y funciones de los dialogos
  const [openDialog,setOpenDialog]=useState(false);
  const toggleDialog=()=>{
        setOpenDialog(!openDialog)

  }

  const [openDialogStructure,setOpenDialogStructure]=useState(false)
  const toggleDialogStructure=()=>setOpenDialogStructure(!openDialogStructure)
  const [openDialogField,setOpenDialogField]=useState(false)
  const toggleDialogField=()=>setOpenDialogField(!openDialogField)
  const [openNewProductDialog,setOpenNewProductDialog]=useState(false)
  const toggleNewProductDialog=()=>setOpenNewProductDialog(!openNewProductDialog)
  const [openEditProductDialog,setOpenEditProductDialog]=useState(false)
  const toggleEditProductDialog=()=>setOpenEditProductDialog(!openEditProductDialog)
  const [openAddFilterDialog,setOpenAddFilterDialog]=useState(false)
  const toggleAddFilterDialog=()=>setOpenAddFilterDialog(!openAddFilterDialog)
  //terminan variables y funciones de los dialogos

  const[camposState,setCamposState]=useState([])
  const[editFields,setEditFields]=useState({})
  const [values,setValues]=useState({})
  const [searchProductsFilter,setSearchProductsFilter]=useState(false)
  let catList=[];
  let campos=[];
  console.log("catobjectrr",categoryObject)
  
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
  
  useEffect(()=>{
    if(categoryObject.type==1 && openDialog==false)
      toggleDialog()

  },[categoryObject])
  
  const displayTypes=(values)=>
    values.map(v=><span>{v.name} &nbsp;</span>)

  const updateData=()=>{
    if(searchProductsFilter==true){
      console.log("vallls",values)
      dispatch(fetchFilterResults(values))
    }
  }

  const searchSubcategoriesProps={
    category,
    setCategory,
    toggleDialog,
    openDialog
  }

  const structureCategoryProps={
    openDialog:openDialogStructure,
    toggleDialog:toggleDialogStructure,
    multipleFieldName:fieldName,
    category,
    callCategoryStructure
  }

  const dialogFieldProps={
    openDialog:openDialogField,
    toggleDialog:toggleDialogField,
    category,
    setCategory
        
  }
  const editProductProps={
    openDialog:openEditProductDialog,
    toggleDialog:toggleEditProductDialog,
    editFields:editFields,
    updateData:updateData
   //formFields:formFields

  }

  const newProductProps={
    openDialog:openNewProductDialog,
    toggleDialog:toggleNewProductDialog,
    category:category

  }

  const addFilterDialogProps={
    openDialog:openAddFilterDialog,
    toggleDialog:toggleAddFilterDialog,
    setHasAddFilter:setHasAddFilter,
    hasAddFilter:hasAddFilter,
    values,
    setValues:setValues,
    setSearchProductsFilter,
    searchProductsFilter
  }
  return (
    <div className="detailedProduct">
      <Breadcrumb
        category={category}
        setCategory={setCategory}
        toggleDialog={toggleDialog}
      />

      <DisplayWholeCategoryFieldsTable
        toggleDialogField={toggleDialogField}
        toggleDialogStructure={toggleDialogStructure}
        setFieldName={setFieldName}
        setCategory={setCategory}
        callCategoryStructure={callCategoryStructure}
      />
      {/*<FormButton 
        className="addFirstButton"
        onClick={()=>toggleDialogField()}
      >
          Anadir campo a {categoryObject.name}
      </FormButton>*/}
      
      <DialogsOfProductsDetails
        searchSubcategoriesProps={searchSubcategoriesProps}
        structureCategoryProps={structureCategoryProps}
        dialogFieldProps={dialogFieldProps}
        editProductProps={editProductProps}
        newProductProps={newProductProps}
        addFilterDialogProps={addFilterDialogProps}
      />
      <DisplayWholeProductsTable
        toggleAddFilterDialog={toggleAddFilterDialog}
        toggleNewProductDialog={toggleNewProductDialog}
        toggleEditProductDialog={toggleEditProductDialog}
        setEditFields={setEditFields}
        setSearchProductsFilter={setSearchProductsFilter}
        searchProductsFilter={searchProductsFilter}
      />
      

    {/*strCategory!==undefined && 
    
      <div>
        <DisplayCategoryFieldsTable
          toggleDialogStructure={toggleDialogStructure}
          setFieldName={setFieldName}
          setCategory={setCategory}
        />
    </div>*/}      
    {/*productsFromStructure.length>0
      ?
      <p className="titleLabel">
        Products
      </p>
      :
      <p className="titleLabel">
        There are not products in this category
      </p>}
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
          dispatch(getProductCategories(category))
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
      */}
      {/*<DisplayProductsTable
        camposState={camposState}
        setEditFields={setEditFields}
        toggleEditProductDialog={toggleEditProductDialog}
        searchProductsFilter={searchProductsFilter}
        setSearchProductsFilter={setSearchProductsFilter}
        
        updateData={updateData}
        
      />*/}
    </div>
  )
}

export default DetailedProduct
