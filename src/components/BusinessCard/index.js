import React, {useState} from 'react'
import {MdAddCircleOutline} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBusinessInstances } from '../../redux/businessInstance/actions'
import AddBusinessInstance from '../AddBusinessInstance'

import './styles.scss'

const mapToState=({businessesInstances})=>({
  allBusinessesInstances:businessesInstances.businessesInstances,
  ownBusinessInstances:businessesInstances.businessInstances
})

const BusinessCard = ({business,setBusinessId,toggleDialog}) => {
   
  const dispatch=useDispatch();
  
  const {allBusinessesInstances,
        ownBusinessInstances}=useSelector(mapToState)
  const fetchInstances=()=>{
    dispatch(fetchBusinessInstances({
      data:allBusinessesInstances,
      business:business.id
    }))
  }
  return (
    <div class="businessCard">
      <p className="name">{business.name}</p>
      <p className="addDiv">
        <MdAddCircleOutline 
          className="add"
          onClick={()=>{
            setBusinessId(business.id)
            console.log("Add instance");
            toggleDialog()
          }}/>
        
      </p>
      
    </div>
    )
}

export default BusinessCard
