import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { searchBusiness } from '../../redux/business/business.actions';
import { fetchBusinessInstances } from '../../redux/businessInstance/actions';
import FormInput from '../Forms/FormInput'

const mapState=({business,businessesInstances})=>({
  allBusiness:business.allBusiness,
  filteredData:business.filteredData,
  allBusinessInstances:businessesInstances.businessesInstances
})

const SearchBusiness = () => {
  const dispatch=useDispatch();
  const [business,setBusiness]=useState("");
  const {allBusiness,filteredData,
  allBusinessInstances}=useSelector(mapState)
  const search=(payload)=>{
    dispatch(searchBusiness(payload));
  }
  useEffect(() => {
    dispatch(searchBusiness({data:allBusiness,filter:""}));
    
  }, [])

  const style={width:"250px",borderRadius:"5px",
  marginTop:"10px",marginBottom:"20px",
  marginLeft:"25px"}
  return (
    
      <FormInput
      value={business}
      onChange={(e)=>setBusiness(e.target.value)}
      type="text"
      placeholder="Business"
      style={style}
      onKeyUp={(e)=>{
        if(e.key=="Enter"){
          search({data:allBusiness,filter:business})
          /*dispatch(fetchBusinessInstances({
            data:allBusinessInstances,
            business:filteredData[0].id

          }))*/
        }
      }} />

      
  
  )
}

export default SearchBusiness
