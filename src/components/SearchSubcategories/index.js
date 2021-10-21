import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, fetchCategories, searchCategories, setCategories } from '../../redux/products/actions'
import getBreadCrumb from '../../utilities/generateBreadCrumb'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'
import './styles.scss'

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
    setCategory(0);
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
                className={
                  sc.type==1
                    ?"combo"
                    :"comboDisabled"
                } 
                key={i} 
                onClick={()=>{
                  if(sc.type==1){
                    setBreadCrumb(getBreadCrumb(allCats,sc.id));
                    setCategory(sc.id);
                    setCatName(sc.name)
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
                className={
                  sc.type==1
                    ?"combo"
                    :"comboDisabled"
                } 
                key={i}
                onClick={()=>{
                  if(sc.type==1){
                    setBreadCrumb(getBreadCrumb(allCats,sc.id));
                    setIsSearching(false);
                    setCatName(sc.name)
                    setCategory(sc.id);
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
      <FormInput 
        onChange={(e)=>setNewCategory(e.target.value)}
        placeholder="Add Category"
        value={newCategory}
        style={{marginTop:"10px"}}
        onKeyUp={e=>{
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
        }}
      />
      <FormInput 
        onChange={(e)=>setNewProduct(e.target.value)}
        placeholder="Add Product"
        value={newProduct}
        onKeyUp={e=>{
          if(e.key=="Enter"){
            dispatch(createProduct({
              id:allCats.length+1,
              name:newProduct,
              category:category,
              type:0
            }))
            setIsSearching(false)
            setCategory(category);
            setNewProduct("")
          }
        }}
      />
    </Dialog>
  )
}

export default SearchSubcategories
