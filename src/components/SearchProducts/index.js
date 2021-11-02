import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, fetchCategories, searchCategories, setCategories } from '../../redux/products/actions'
import getBreadCrumb from '../../utilities/generateBreadCrumb'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'
import './styles.scss'
import {FaPencilAlt} from 'react-icons/fa'

const mapToState=({product})=>({
  allCats:product.allCategories,
  subcategories:product.categories,
  scategories:product.searchCategories
})

const SearchSubcategories = ({
  catName,
  setCatName,
  setCategory,
  category=0,
  setBreadCrumb,
  openDialog,
  toggleDialog
}) => {
  const [newProduct,setNewProduct]=useState("")
  const [newCategory,setNewCategory]=useState("")
  const [isSearching,setIsSearching]=useState(false);
  const [search,setSearch]=useState("")
  const dispatch=useDispatch();
  const {subcategories,allCats,scategories}=useSelector(mapToState)
  
  useEffect(()=>{
    if(category==0){
      dispatch(fetchCategories({
        data:allCats,
        category:-1
      }))
    }else{
      dispatch(fetchCategories({
        data:allCats,
        category
      }))
    }
  },[])

  useEffect(()=>{
    if(category==0){
      dispatch(fetchCategories({
        data:allCats,
        category:-1
      }))
    }else{
      dispatch(fetchCategories({
        data:allCats,
        category
      }))
    }
  },[category])

  const closeDialog=()=>{
    toggleDialog();
   //setCategory(0);
  }
  return (
    openDialog && 
    <Dialog 
      headline={"Category: "+ catName}
      open={openDialog}
      closeDialog={()=>closeDialog()}>
      
      <FormInput 
        onChange={(e)=>setSearch(e.target.value)}
        placeholder="Search subcategory"
        value={search}/>
      
      <FormButton
        onClick={()=>{
          setIsSearching(true)
          dispatch(searchCategories(
            {
              data:subcategories,
              search:search
            }
          ))
        }}
      >
        Search
      </FormButton>

      {!isSearching 
      ? subcategories.length>0 
        && 
        <div className="containerCombo">
          <div className="scrollCombo">
            {subcategories.map((sc,i)=>
              <div 
                 
                key={i} 
                onClick={()=>{
                  console.log("scid",sc.id);
                  if(sc.type==1){
                    setBreadCrumb(getBreadCrumb(allCats,sc.id));
                    setCategory(sc.id);
                    setCatName(sc.name)
                  }else if(sc.type==0){
                    setBreadCrumb(getBreadCrumb(allCats,sc.id));
                    setCategory(sc.id);
                    setCatName(sc.name)
                    closeDialog();
                  }
                }}
              >
                {sc.name} 
                {sc.type==1 
                  ? "(category)"
                  :"(product)"
                }
              </div>
            )}
          </div>
        </div>
      :scategories.length>0 
        && 
        <div className="containerCombo">
          <div className="scrollCombo">
            {scategories.map((sc,i)=>
              <div 
                 
                key={i}
                onClick={()=>{
                  if(sc.type==1){
                    setBreadCrumb(getBreadCrumb(allCats,sc.id));
                    setIsSearching(false);
                    setCatName(sc.name)
                    setCategory(sc.id);
                  }else if(sc.type==0){
                    setBreadCrumb(getBreadCrumb(allCats,sc.id));
                    setIsSearching(false);
                    setCatName(sc.name)
                    setCategory(sc.id);
                    closeDialog();
                  }
                }}
              >
                {sc.name} 
                {sc.type==1 
                  ? "(category)" 
                  :"(product)"
                }
              </div>
              
            )}
          </div>
        </div>
      }
      
    </Dialog>
  )
}

export default SearchSubcategories
