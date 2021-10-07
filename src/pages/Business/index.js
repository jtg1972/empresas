import React,{useState,useEffect} from 'react'
import Dialog from '../../components/Dialog'
import './styles.scss';
import {MdAddCircleOutline} from 'react-icons/md'
import FormInput from '../../components/Forms/FormInput';
import FormButton from '../../components/Forms/FormButton';
import { createBusiness, fetchBusinesses, resetCreateBusiness } from '../../redux/business/business.actions';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/Alert';

const mapState=({business})=>({
  allBusiness:business.allBusiness,
  errorBusiness:business.errorCreateBusiness,
  successBusiness:business.successCreateBusiness
})
const Business = () => {
  const dispatch=useDispatch()
  const {
    allBusiness,
    errorBusiness,
    successBusiness}=useSelector(mapState)

  const [open,setOpen]=useState(false);
  const [business,setBusiness]=useState("");
  const [alertText,setAlertText]=useState("")
  const [clsDialog,setClsDialog]=useState(false);
  const toggleDialog=()=>setOpen(!open);

  const cleanAndCloseDialog=()=>{
    setBusiness("");
    toggleDialog();
  }

  useEffect(()=>{
    dispatch(fetchBusinesses());
  },[])

  useEffect(()=>{
    if(successBusiness==true){
      cleanAndCloseDialog();
      dispatch(resetCreateBusiness());
      setAlertText("Business has been added succesfully")
    }
  },
  [successBusiness])

  
  

  const addBusiness=()=>{
    
    dispatch(createBusiness(business));
    
  
    
  }
  const closeDialog=()=>{
    cleanAndCloseDialog();
    dispatch(resetCreateBusiness());
    setAlertText("No business has been added");

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
    <div className="business">
      {open && <Dialog open={open} 
        headline="Businesses"
        closeDialog={closeDialog}>
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
       <a onClick={()=>toggleDialog()}>
        <MdAddCircleOutline className="add"/>
      </a>

      <div className="allBusiness">
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        
        {allBusiness.map(b=>{
          return <p>{b}</p>
        }
        )}
      </div>
    
    </div>
  )
}

export default Business;
