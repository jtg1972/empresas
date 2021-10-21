import React,{useState,useEffect} from 'react'
import Dialog from '../Dialog'
import FormInput from '../Forms/FormInput';
import FormButton from '../Forms/FormButton';
import { createBusiness, fetchBusinesses, resetCreateBusiness, searchBusiness } from '../../redux/business/business.actions';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../Alert';
import { fetchBusinessInstances } from '../../redux/businessInstance/actions';
import businessInstanceSaga from '../../redux/businessInstance/sagas';

const mapState=({business,businessesInstances})=>({
  allBusiness:business.allBusiness,
  businessLength:business.allBusiness.length,
  errorBusiness:business.errorCreateBusiness,
  successBusiness:business.successCreateBusiness,
  allBusinessInstances:businessesInstances.businessesInstances,

})

const CreateBusinessDialog = ({toggleDialog,openDialog}) => {

  const dispatch=useDispatch()
  const {
    allBusiness,
    businessLength,
    errorBusiness,
    successBusiness,
    allBusinessInstances}=useSelector(mapState)

  
  const [business,setBusiness]=useState("")
  const [alertText,setAlertText]=useState("")
  const [clsDialog,setClsDialog]=useState(false)
  

  const cleanAndCloseDialog=()=>{
    setBusiness("")
    toggleDialog()
  }


  useEffect(()=>{
    if(successBusiness==true){
      console.log("entro effect")
      dispatch(resetCreateBusiness())
      cleanAndCloseDialog()
      dispatch(searchBusiness({
        data:allBusiness,
        filter:business
      }))
      dispatch(fetchBusinessInstances({data:allBusinessInstances,business:business.length}))

      setAlertText("Business has been added succesfully")
    }
  },
  [successBusiness])

  
  

  const addBusiness=()=>{
    
    dispatch(createBusiness({
      name:business,
      id:businessLength+1}))
    
  
    
  }
  const closeDialog=()=>{
    cleanAndCloseDialog()
    dispatch(resetCreateBusiness())
    setAlertText("No business has been added")

    setClsDialog(true);
  }

  const displayError=()=>(
    <p className="error">{errorBusiness}</p>
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
        headline="Businesses"
        closeDialog={closeDialog}
        open={openDialog}
        >
      
        {errorBusiness!==""?
          displayError():""}

        <FormInput type="text"
          placeholder="Business Name"
          onChange={(e)=>{setBusiness(e.target.value)}}
          value={business}/>

        <FormButton onClick={()=>{addBusiness()}}>Añadir Negocio</FormButton>

      </Dialog>
      }
        
      {alertText!=="" && clsDialog==false && displayAlert("success")}
      {alertText!=="" && clsDialog==true && displayAlert("danger")}
      
    </div>
  )
}

export default CreateBusinessDialog
