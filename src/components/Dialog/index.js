import React,{useEffect} from 'react'
import Shadow from '../Shadow'
import './styles.scss'

const Dialog = ({children,
  open,
  closeDialog,
  headline,
  
  }) => {
  return (
    
      open ?<div>
              <Shadow opacity={0.3}/>
              <div className="dialog">
                <div className="header">
                  
                  <h1 className="headline">{headline}</h1>
                  <p className="close" onClick={closeDialog}>X</p>
                </div>
                <div className="childContent">
                  {children}
                </div>
              </div>
            </div>:""
  )
}

export default Dialog
