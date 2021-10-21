import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchSubcategories from '../../components/SearchSubcategories';
import { allCategories, fetchCategories } from '../../redux/products/actions';


import './styles.scss';


const Products = () => {
  const [category,setCategory]=useState(0)
  const [catName,setCatName]=useState("Categories")
  const [breadCrumb,setBreadCrumb]=useState([{id:0,name:"Categories"}])
  const [openDialog,setOpenDialog]=useState(false);
  const toggleDialog=()=>setOpenDialog(!openDialog)

  
  return (
  <div className="products">
    <div className="breadcrumb">
      {breadCrumb.map(cat=>
      <span className="pill" onClick={()=>{
        console.log("cid",cat.id);
        setCatName(cat.name)
        setCategory(cat.id)
        toggleDialog()}
      }
      >
        {cat.name}
      </span>)}
      
    </div>
    <SearchSubcategories 
      category={category}
      setCategory={setCategory}
      catName={catName}
      setCatName={setCatName}
      setBreadCrumb={setBreadCrumb}
      breadCrumb={breadCrumb}
      toggleDialog={toggleDialog}
      openDialog={openDialog}/>

  </div>)
}

export default Products;
