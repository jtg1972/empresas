import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, fetchCategories, getCategory, searchCategories, setCategories } from '../../redux/products/actions'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'
import DisplaySubcategoriesCombo from './DisplaySubcategoriesCombo.js'
import './styles.scss'

const mapToState=({product})=>({
  allCats:product.allCategories,
  categoryObject:product.category,
  subcategories:product.categories,
  scategories:product.searchCategories,
  breadCrumb:product.breadCrumb
})

const SearchSubcategories = ({
  category,
  setCategory,
  openDialog,
  toggleDialog
}) => {
  const [newProduct,setNewProduct]=useState("")
  const [newCategory,setNewCategory]=useState("")
  const [isSearching,setIsSearching]=useState(false);
  const [search,setSearch]=useState("")
  const dispatch=useDispatch();
  const {
    allCats,
    subcategories,
    scategories,
    categoryObject,
  }=useSelector(mapToState)

  useEffect(()=>{
    if(categoryObject.type==0 && openDialog==true){
      toggleDialog()
    }
  },[categoryObject])

  const closeDialog=()=>{
    toggleDialog();
  }

  

  const addCategoryInputKeyUp=e=>{
    if(e.key=="Enter"){
      dispatch(createProduct({
        id:allCats.length+1,
        name:newCategory,
        category:category,
        type:1
      }))
      setIsSearching(false)
      setCategory(category);
      setNewCategory("");
    }
  }

  const addProductsCategoryInputKeyUp=e=>{
    if(e.key=="Enter"){
      dispatch(createProduct({
        id:allCats.length+1,
        name:newProduct,
        category:category,
        type:0
      }))
      setIsSearching(false)
      setCategory(category);
      setNewProduct("");
    }
  }

  const dialogConfig={
    headline:`Category: ${categoryObject.name}`,
    open:openDialog,
    closeDialog:()=>closeDialog(),
    type:categoryObject.type
  }

  const inputSearchCategoryConfig={
    onChange:(e)=>setSearch(e.target.value),
    placeholder:"Search subcategory",
    value:search
  }
  const buttonSearchCategoryConfig={
    onClick:()=>{
      setIsSearching(true)
      dispatch(searchCategories(
        search
      ))
    }
  }

  const comboDisplaySubcategoriesNotSearch={
    subCategories:subcategories,
    setCategory,
    setIsSearching:setIsSearching
  }

  const comboDisplaySubcategoriesSearch={
    subCategories:scategories,
    setCategory,
    setIsSearching:setIsSearching
  }

  const inputAddCategoryConfig={
    onChange:(e)=>setNewCategory(e.target.value),
    placeholder:"Add Category",
    value:newCategory,
    className:"addCategoryInput",
    onKeyUp:e=>addCategoryInputKeyUp(e)
  }
  const inputAddProductsCategoryConfig={
    onChange:(e)=>setNewProduct(e.target.value),
    placeholder:"Add Product Category",
    value:newProduct,
    className:"addCategoryInput",
    onKeyUp:e=>addProductsCategoryInputKeyUp(e)
  }

  
  return (
    openDialog &&
    <Dialog 
      {...dialogConfig}
    >
      
      <FormInput 
        {...inputSearchCategoryConfig}
      />
      
      <FormButton
        {...buttonSearchCategoryConfig}   
      >
        Search
      </FormButton>

      {!isSearching 
      ?
        <DisplaySubcategoriesCombo
          {...comboDisplaySubcategoriesNotSearch}
          />
      :
        <DisplaySubcategoriesCombo
          {...comboDisplaySubcategoriesSearch}
        />
      }
      
      <FormInput 
        {...inputAddCategoryConfig}
      />
      <FormInput
        {...inputAddProductsCategoryConfig}
      />
    
    </Dialog>
  )
}

export default SearchSubcategories
