import React,{useState,useEffect} from 'react'
import CreateBusinessDialog from '../CreateBusinessDialog';
import {MdAddCircleOutline} from 'react-icons/md'
import './styles.scss'
import {createBusiness, fetchBusinesses, resetCreateBusiness, searchBusiness } from '../../redux/business/business.actions';
import { useDispatch, useSelector } from 'react-redux';
import AddBusinessInstance from '../AddBusinessInstance';
import { fetchBusinessInstances } from '../../redux/businessInstance/actions';

const mapState=({business,businessesInstances})=>({
  allBusiness:business.allBusiness,
  filteredData:business.filteredData,
  errorBusiness:business.errorCreateBusiness,
  successBusiness:business.successCreateBusiness,
  businessInstances:businessesInstances.businessesInstances
})
const Sidebar = ({setBusiness}) => {
  const [businessId,setBusinessId]=useState(0)
  const [businessName,setBusinessName]=useState("");
  const [active,setActive]=useState(-1)
  const dispatch=useDispatch()
  const {
    allBusiness,
    filteredData,
    businessInstances
    }=useSelector(mapState)

  useEffect(()=>{
    dispatch(fetchBusinesses())
    dispatch(searchBusiness({data:allBusiness,filter:""}))
    //setActive(filteredData[0].id);
  },[])

  useEffect(()=>{
    if(filteredData.length>0){
      setBusiness(filteredData[0].id)
      setActive(filteredData[0].id)
      dispatch(fetchBusinessInstances({data:businessInstances,business:businessInstances[0].id}))
    }else{
      setBusiness(-1);
      setActive(-1);
      dispatch(fetchBusinessInstances({data:businessInstances,business:-1}))
    }
  },[filteredData])
  
  const [openCreateBusiness,setOpenCreateBusiness]=useState(false);
  const[openCreateBusinessInstance,setOpenCreateBusinessInstance]=useState(false);
  const toggleCreateBusiness=()=>setOpenCreateBusiness(!openCreateBusiness)
  const toggleCreateBusinessInstance=()=>setOpenCreateBusinessInstance(!openCreateBusinessInstance);
  return (
      <div className="sidebar">
        <ul>
          <li className="bu-sidebar">
            <b>Negocios</b> 
            <a onClick={()=>toggleCreateBusiness()

            }>
              <MdAddCircleOutline className="add"/>
            </a>
          </li>
          {filteredData.map((bItem,i)=>{
            return (
              <li key={i} className={active==bItem.id?"bu-sidebar active":"bu-sidebar"}>
                <p onClick={()=>{
                  console.log("biid",bItem.id)
                  setBusiness(bItem.id)
                  setActive(bItem.id)
                }}>{bItem.name}</p>
                <p onClick={()=>{
                  setActive(bItem.id)
                  setBusiness(bItem.id)
                  toggleCreateBusinessInstance()
                  console.log("ocbi",openCreateBusinessInstance)
                  setBusinessId(bItem.id)
                  setBusinessName(bItem.name)
                  dispatch(fetchBusinessInstances({data:businessInstances,business:bItem.id}))
                }}>
                  <MdAddCircleOutline className="add"/>
                </p>
              </li>
            )
          })}

        </ul>
         
        <CreateBusinessDialog 
          toggleDialog={toggleCreateBusiness}
          openDialog={openCreateBusiness}/>
        
        <AddBusinessInstance 
          openDialog={openCreateBusinessInstance}
          toggleDialog={toggleCreateBusinessInstance}
          businessId={businessId}
          businessName={businessName}/>
      </div>
    )
  }
export default Sidebar;
