import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStructureEmpty, getStructureCategory } from '../../redux/structure/actions';
import FormInput from '../Forms/FormInput';
import FormButton from '../Forms/FormButton';

const DisplayFields = ({structure,fields,setFields}) => {

  //const [fields,setFields]=useState({})
  
  return (
    <div>
      {structure.fields.map((cat,index)=>{
        if(cat.dataType=="singleValue"){
          return <FormInput 
          placeholder={cat.fieldName}
          value={fields[cat.fieldName]}
          onChange={(e)=>{
            const fieldName=cat.fieldName;
            setFields({...fields,[fieldName]:e.target.value})}
          }>
          
          </FormInput>
        }else if(cat.dataType=="multipleValue"){
          return <div>
            <select value={fields[cat.fieldName]}
              onChange={(e)=>{
                const fieldName=cat.fieldName;
                setFields({...fields,[fieldName]:e.target.value})
              }}>
      
                <option value="">Select {cat.displayName}</option>
                {cat.values.map(v=>
                  <option value={v.value}>{v.name}</option>)
                }
              
          </select>
          
        </div>
        }
      })
    }
    </div>
  )
}

export default DisplayFields
