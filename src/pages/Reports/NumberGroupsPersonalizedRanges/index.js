import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import Dialog from '../../../components/Dialog'
import FormButton from '../../../components/Forms/FormButton'
import FormInput from '../../../components/Forms/FormInput'
import { addQueryGroup } from '../../../redux/reports/actions'

const NumberGroupsPersonalizedRanges = ({
  openDialog,
  toggleDialog,
  field,
  setRangeOptionsVisible
}) => {
  /*useEffect(()=>{
    setIntervalRange(0)
  },[])*/
  const dispatch=useDispatch();
  const [inputs,setInputs]=useState([])
  const [startValue,setStartValue]=useState(0)
  const [endValue,setEndValue]=useState(0)
  const addRangeBlock=()=>{
    
    if(startValue!=="" || endValue==!""){
      
    
      setInputs([...inputs,parseInt(startValue),parseInt(endValue)])
    }
    console.log("startvalue endvalue",startValue,endValue)
    
  }
  return (
    <Dialog
      open={openDialog}
      closeDialog={toggleDialog}
      headline="Add Personalized Intervals"
    >
      <div style={{display:"flex"}}>
      <FormInput
        type="number"
        onChange={(e)=>setStartValue(e.target.value)}
        value={startValue}
        placeholder="From"
      ></FormInput>
      <FormInput
        type="number"
        onChange={(e)=>setEndValue(e.target.value)}
        placeholder="To"
      ></FormInput>
      <FormButton 
        value={endValue}
        onClick={
          ()=>{
            if(startValue!="" && endValue!="")
              addRangeBlock()
           }
      }>Add Rangasdf</FormButton>
      <FormButton onClick={
        ()=>{
          dispatch(addQueryGroup({...field,inputs}))
          toggleDialog()
          setRangeOptionsVisible(false)
          
        }
      }>Done</FormButton>
    </div>
    <div style={{display:"flex",flexDirection:"column"}}>
    {inputs.map((i,index)=>{
      if(index%2==0){
        return <p>{i} - {inputs[index+1]}</p>
      }
    })}
    </div>
    </Dialog>
  )
}

export default NumberGroupsPersonalizedRanges