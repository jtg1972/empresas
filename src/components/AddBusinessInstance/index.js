
import React,{useState,useEffect} from 'react'
import Dialog from '../Dialog'
import FormInput from '../Forms/FormInput';
import FormButton from '../Forms/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../Alert';
import { 
  createBusinessInstance,
  fetchBusinessInstances,
  resetCreateBusinessInstance, 
} 
from '../../redux/businessInstance/actions';

const mapState=({businessesInstances})=>({
  businessInstanceLength:businessesInstances.businessesInstances.length,
  errorBusinessInstance:businessesInstances.errorCreateBusinessInstance,
  successBusinessInstance:businessesInstances.successCreateBusinessInstance,
  allBusinessInstances:businessesInstances.businessesInstances
})

const AddBusinessInstance = ({
  toggleDialog,
  openDialog,
  businessId,
  businessName
}) => {
  const dispatch=useDispatch()
  //console.log("bid",businessId)
  const {
    businessInstanceLength,
    errorBusinessInstance,
    successBusinessInstance,
    allBusinessInstances,
  }=useSelector(mapState)

  const [businessInstance,setBusinessInstance]=useState("")
  const [alertText,setAlertText]=useState("")
  const [clsDialog,setClsDialog]=useState(false)
  
  const cleanAndCloseDialog=()=>{
    setBusinessInstance("")
    toggleDialog()
    console.log("cleanandclose")
  }

  useEffect(()=>{
    if(successBusinessInstance===true){
      dispatch(resetCreateBusinessInstance())
      //console.log("entro effect")
      //console.log("opda",openDialog)
      cleanAndCloseDialog()
      //console.log("opdd",openDialog)
      setAlertText("Business instance has been added succesfully")
      dispatch(fetchBusinessInstances({
        data:allBusinessInstances,
        business:businessId
      }))
    }
  },[successBusinessInstance])

  const title=businessName?
    businessName+" Business Instance":
    "Business Instance";
  

  const addBusiness=()=>{
    //console.log("addbusines")
    dispatch(createBusinessInstance({
      business:businessId,
      name:businessInstance,
      id:businessInstanceLength+1}))
  }

  const closeDialog=()=>{
    cleanAndCloseDialog()
    dispatch(resetCreateBusinessInstance())
    setAlertText("No business instance has been added")
    setClsDialog(true);
  }

  const displayError=()=>(
    <p className="error">{errorBusinessInstance}</p>
  )

  const displayAlert=(type)=>{
    return <Alert 
      setAlertText={setAlertText}
      type={type}
      setClsDialog={setClsDialog}
    >
      {alertText}
    </Alert>
  }

  return (
    <div>
      {openDialog &&
      <Dialog  
        headline={title}
        closeDialog={closeDialog}
        open={openDialog}>

        {errorBusinessInstance!==""?
          displayError():
          ""
        }

        <FormInput type="text"
          placeholder="Business Instance Name"
          onChange={(e)=>{setBusinessInstance(e.target.value)}}
          value={businessInstance}/>

        <FormButton onClick={()=>{addBusiness()}}>Add Business Instance</FormButton>

      </Dialog>
      }        
      {alertText!=="" && clsDialog==false && displayAlert("success")}
      {alertText!=="" && clsDialog==true && displayAlert("danger")}
    </div>
  )
}

export default AddBusinessInstance
