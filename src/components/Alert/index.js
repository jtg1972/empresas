import React,{useEffect} from 'react'
import Shadow from '../Shadow'
import './styles.scss';
const Alert = ({children,type,timeout,setClsDialog,setAlertText}) => {
  const bg=type=="success"?"green":"red"
  useEffect(()=>{
    setTimeout(()=>{
      setAlertText("")
      setClsDialog(false);
    },3000);
  },[])
  return (
    <div>
      <Shadow opacity={0.7}/>
      <div className="alert" style={{backgroundColor:bg}}>
        {children}
      </div>

    </div>
  )
} 

export default Alert
