import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStructureEmpty, getStructureCategory } from '../../redux/structure/actions';
import FormInput from '../Forms/FormInput';
import FormButton from '../Forms/FormButton';
import DatePicker, { CalendarContainer } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './styles.scss'
const DisplayFields = ({
  structure,
  fields,
  setFields
}) => {
  console.log("strdifields",structure)
  const inputChange=(cat,e)=>{
    const fieldName=cat.fieldName
    setFields({
      ...fields,
      [fieldName]:e.target.value
    })
  }

  const selectChange=(cat,e)=>{
    const fieldName=cat.fieldName;
    setFields({
      ...fields,
      [fieldName]:e.target.value
    })
  }

  const dateChange=(cat,e)=>{
    const fieldName=cat.fieldName
    setFields({
      ...fields,
      [fieldName]:e
    })
  }

  const formInputConfig=(cat,index)=>({
    key:index,
    placeholder:cat.fieldName,
    value:fields[cat.fieldName],
    onChange:(e)=>inputChange(cat,e)
  })

  const selectConfig=(cat,index)=>({
    value:fields[cat.fieldName],
    onChange:(e)=>selectChange(cat,e)
  })

  return (
    <div>
      
      {structure.fields.map((cat,index)=>{
        console.log("cat",cat)
        if(cat.dataType=="singleValue"){
          if(cat.declaredType=="string" ||
          cat.declaredType=="number"){
            return (<FormInput 
              {...formInputConfig(cat,index)}
            />)
          }else if(cat.declaredType=="date"){
            return (<div>
              <p>{cat.displayName}:</p>
              <DatePicker 
                placeholderText={cat.displayName} 
                selected={fields[cat.fieldName]}
                onChange={(e)=>dateChange(cat,e)}
                
              />
            </div>)
          }
        }else if(cat.dataType=="multipleValue"){
          return(
            <div> 
              <select {...selectConfig(cat,index)}>
                <option value="">Select {cat.displayName}</option>
                {cat.values.map(v=>
                  <option value={v.value}>{v.value}</option>)
                }
              </select>
            </div>
          )
        }

      })
    }
    </div>
  )
}

export default DisplayFields
