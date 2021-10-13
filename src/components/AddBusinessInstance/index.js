
import React,{useState,useEffect} from 'react'
import Dialog from '../Dialog'
import FormInput from '../Forms/FormInput';
import FormButton from '../Forms/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../Alert';
import { createBusinessInstance,
        resetCreateBusinessInstance, 
        setBusinessInstances } 
        from '../../redux/businessInstance/actions';

const mapState=({businessesInstances})=>({
  businessInstanceLength:businessesInstances.businessesInstances.length,
  errorBusinessInstance:businessesInstances.errorCreateBusinessInstance,
  successBusinessInstance:businessesInstances.successCreateBusinessInstance
})

const AddBusinessInstance = ({toggleDialog,openDialog,businessId}) => {
  const dispatch=useDispatch()
  console.log("bid",businessId)
  const {
    businessInstanceLength,
    errorBusinessInstance,
    successBusinessInstance}=useSelector(mapState)

  
  const [businessInstance,setBusinessInstance]=useState("")
  const [alertText,setAlertText]=useState("")
  const [clsDialog,setClsDialog]=useState(false)
  

  const cleanAndCloseDialog=()=>{
    setBusinessInstance("")
    toggleDialog()
  }


  useEffect(()=>{
    if(successBusinessInstance===true){
      console.log("entro effect")
      dispatch(resetCreateBusinessInstance())
      cleanAndCloseDialog()

      setAlertText("Business instance has been added succesfully")
    }
  },
  [successBusinessInstance])

  
  

  const addBusiness=()=>{
    console.log("addbusines")
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
        headline="Business Instance"
        closeDialog={closeDialog}
        open={openDialog}
        >
      
        {errorBusinessInstance!==""?
          displayError():""}

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
