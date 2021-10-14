import React,{useState,useEffect} from 'react'
import CreateBusinessDialog from '../CreateBusinessDialog';
import {MdAddCircleOutline} from 'react-icons/md'
import './styles.scss'
import { createBusiness, fetchBusinesses, resetCreateBusiness, searchBusiness } from '../../redux/business/business.actions';
import { useDispatch, useSelector } from 'react-redux';

const mapState=({business,businessesInstances})=>({
  allBusiness:business.allBusiness,
  filteredData:business.filteredData,
  errorBusiness:business.errorCreateBusiness,
  successBusiness:business.successCreateBusiness,
  businessInstances:businessesInstances.businessesInstances
})
const Sidebar = () => {
  const dispatch=useDispatch()
  const {
    allBusiness,
    filteredData
    }=useSelector(mapState)

  useEffect(()=>{
    dispatch(fetchBusinesses())
    //dispatch(searchBusiness({data:allBusiness,filter:""}))
  },[])
  const [openCreateBusiness,setOpenCreateBusiness]=useState(false);
  const toggleCreateBusiness=()=>setOpenCreateBusiness(!openCreateBusiness)
  return (
      <div className="sidebar">
        <ul>
          <li className="bu-sidebar">
            <b>Negocios</b> 
            <a onClick={()=>toggleCreateBusiness()}>
              <MdAddCircleOutline className="add"/>
            </a>
          </li>
          {filteredData.map((bItem,i)=>{
            return (
              <li key={i} className="bu-sidebar">{bItem.name}</li>
            )
          })}

        </ul>
         
          <CreateBusinessDialog 
            toggleDialog={toggleCreateBusiness}
            openDialog={openCreateBusiness}/>
      </div>
    )
  }
export default Sidebar;
