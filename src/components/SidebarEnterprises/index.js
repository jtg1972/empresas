import React,{useState,useEffect} from 'react'
import CreateBusinessDialog from '../CreateBusinessDialog';
import {MdAddCircleOutline} from 'react-icons/md'
import './styles.scss'
import {createBusiness, fetchBusinesses, resetCreateBusiness, searchBusiness } from '../../redux/business/business.actions';
import { useDispatch, useSelector } from 'react-redux';
import AddBusinessInstance from '../../components/AddBusinessInstance';
import { fetchBusinessInstances } from '../../redux/businessInstance/actions';

const mapState=({business,businessesInstances})=>({
  allInstances:businessesInstances.businessesInstances,
  businessInstances:businessesInstances.businessInstances
})
const SidebarEnterprises = ({businessId}) => {
  const dispatch=useDispatch()
  const {
    allInstances,
    businessInstances
    }=useSelector(mapState)

  useEffect(()=>{
    dispatch(fetchBusinessInstances({
      data:allInstances,
      business:parseInt(businessId)
    }))
    
  },[businessId])
  
  const [openCreateBusiness,setOpenCreateBusiness]=useState(false);
  const[openCreateBusinessInstance,setOpenCreateBusinessInstance]=useState(false);
  const toggleCreateBusiness=()=>setOpenCreateBusiness(!openCreateBusiness)
  const toggleCreateBusinessInstance=()=>setOpenCreateBusinessInstance(!openCreateBusinessInstance);
  return (
      <div className="sidebarEnt">
        <ul>
          <li className="bu-sidebar">
            <b>Enterprises</b> 
            
          </li>
          {businessInstances.map((bItem,i)=>{
            return (
              <li key={i} className="bu-sidebar">
                <p>{bItem.name}</p>
                
              </li>
            )
          })}

        </ul>
         
      </div>
    )
  }
export default SidebarEnterprises;
