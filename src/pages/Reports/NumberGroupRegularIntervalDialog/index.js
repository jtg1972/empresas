import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import Dialog from '../../../components/Dialog'
import FormInput from '../../../components/Forms/FormInput'
import { addQueryGroup } from '../../../redux/reports/actions'

const NumberGroupRegularIntervalDialog = ({
  openDialog,
  toggleDialog,
  intervalRange,
  setIntervalRange,
  field,
  setRangeOptionsVisible
}) => {
  /*useEffect(()=>{
    setIntervalRange(0)
  },[])*/
  const dispatch=useDispatch();
  return (
    <Dialog
      open={openDialog}
      closeDialog={toggleDialog}
      headline="Add Regular Intervals"
    >
      <FormInput
        type="number"
        onChange={(e)=>setIntervalRange(e.target.value)}
        placeholder="Rango uniforme de cada intervalo"
        onKeyUp={(e)=>{
          if(e.key=="Enter"){
            console.log("Interange",intervalRange)
            const nuevo={...field,intervalRange:parseInt(intervalRange)}
            dispatch(addQueryGroup(nuevo))
            setRangeOptionsVisible(false)
            toggleDialog()
          }
        }}/>
      

    </Dialog>
  )
}

export default NumberGroupRegularIntervalDialog