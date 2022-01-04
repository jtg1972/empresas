import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStructureEmpty, getStructureCategory } from '../../redux/structure/actions';
import FormInput from '../Forms/FormInput';
import FormButton from '../Forms/FormButton';

const DisplayFields = ({
  structure,
  fields,
  setFields
}) => {


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
        if(cat.dataType=="singleValue"){
          return (<FormInput 
            {...formInputConfig(cat,index)}
          />)
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
