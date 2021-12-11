import React from 'react'
import { useSelector } from 'react-redux'
import DisplayMultipleValue from '../DisplayMultipleValue'
import DisplaySingleValueNumber from '../DisplaySingleValueNumber'
import DisplaySingleValueString from '../DisplaySingleValueString'

const mapToState=({structure})=>({
  fieldCriterias:structure.fieldCriterias
})

const DisplayAllFieldsCriteria = ({
  setValues,
  values,
  campo,
  setOrder,
  operator,
  setOperator
}) => {
  const {fieldCriterias}=useSelector(mapToState)
  const fieldCriteriasGreterThanZero=()=>{
    if(fieldCriterias.length>0)
      return true
    else
      return false
  }
  return fieldCriteriasGreterThanZero() && fieldCriterias.map((fc)=>{
      if(fc.dataType=="multipleValue")
        return <DisplayMultipleValue
          setValues={setValues}
          values={values}
          campo={fc}
          setOrder={setOrder}/>
        
      else if(fc.dataType=="singleValue"){
        if(fc.declaredType=="string")
          return <DisplaySingleValueString
          setValues={setValues}
          values={values}
          campo={fc}
          setOrder={setOrder}
          />  
        
        else
           return <DisplaySingleValueNumber
            setValues={setValues}
            values={values}
            campo={fc}
            setOrder={setOrder}
            operator={operator}
            setOperator={setOperator}
          />
       
      }})
    }


export default DisplayAllFieldsCriteria
