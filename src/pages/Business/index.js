import React,{useState,useEffect} from 'react'
import Dialog from '../../components/Dialog'
import './styles.scss';
import {MdAddCircleOutline} from 'react-icons/md'
import FormInput from '../../components/Forms/FormInput';
import FormButton from '../../components/Forms/FormButton';
import { createBusiness, fetchBusinesses, resetCreateBusiness, searchBusiness } from '../../redux/business/business.actions';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/Alert';
import BusinessCard from '../../components/BusinessCard';
import SearchBusiness from '../../components/SearchBusiness';
import { fetchBusinessInstances } from '../../redux/businessInstance/actions';
import AddBusinessInstance from '../../components/AddBusinessInstance';

const mapState=({business,businessesInstances})=>({
  allBusiness:business.allBusiness,
  filteredData:business.filteredData,
  errorBusiness:business.errorCreateBusiness,
  successBusiness:business.successCreateBusiness,
  businessInstances:businessesInstances.businessesInstances
})
const Business = () => {
  const [openDialog,setOpenDialog]=useState(false)
  const [businessId,setBusinessId]=useState(0)
  const toggleDialog=()=>setOpenDialog(!openDialog)
 
  const dispatch=useDispatch()
  const {
    allBusiness,
    filteredData
    }=useSelector(mapState)

  useEffect(()=>{
    dispatch(fetchBusinesses());
    dispatch(searchBusiness({data:allBusiness,filter:""}))
  },[])
 
  
  return (
    <div className="business">
      <SearchBusiness/>
      <div className="containerCards">  
        {filteredData.map(b=>{
          return <BusinessCard  
          key={b.id} 
          business={b}
          toggleDialog={toggleDialog}
          setBusinessId={setBusinessId}/>
        }
        )}
      </div>
      <AddBusinessInstance 
        openDialog={openDialog}
        toggleDialog={toggleDialog}
        businessId={businessId}/>
  
      
    
    </div>
  )
}

export default Business;
