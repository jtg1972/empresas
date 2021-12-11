import React,{useEffect} from 'react'
import {useSelector, useDispatch } from 'react-redux';
import { getCategory } from '../../redux/products/actions';
import { getFormFields, getStructureCategory } from '../../redux/structure/actions';
import StructureCategory from '../StructureCategory';
import './styles.scss'

const mapToState=({product})=>({
  breadCrumb:product.breadCrumb,  
})

const Breadcrumb = ({
  toggleDialog,
  setCategory,
}) => { 
  const {breadCrumb}=useSelector(mapToState)
  return (
    <div className="breadcrumb">
      {breadCrumb.map(cat=>
        <div className="pill">
          <span onClick={()=>{
            setCategory(cat.id)
            if(cat.type==1)
              toggleDialog()
          }}>
            {cat.name}
          </span>   
        </div>
      )}
    </div>
    
  )
}

export default Breadcrumb



