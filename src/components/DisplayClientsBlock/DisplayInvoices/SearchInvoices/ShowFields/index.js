import React from 'react'

import FormInput from '../../../../Forms/FormInput'
import DatePicker, { CalendarContainer } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const ShowFields = ({
  fieldStructure,
  setFields,
  fields
}) => {
  console.log("fieldstr",fieldStructure)
  return (
    <div>
      Hola
      {fieldStructure.declaredType=="numeric" &&
      <FormInput 
        onChange={(e)=>{
          setFields({[fieldStructure.fieldName]:e.target.value})
        }}
        type="number" 
        placeholder={fieldStructure.displayName}/>
      }
      {fieldStructure.declaredType=="string" &&
      <FormInput
        onChange={e=>{
          setFields({[fieldStructure.fieldName]:e.target.value})
        }}
        placeholder={fieldStructure.displayName}/>
      }
      {fieldStructure.declaredType=="date" && 
      <>
      <DatePicker 
        placeholderText="Start Date"
        selected={fields["date1"]}
        onChange={e=>{
          setFields(f=>({
            date1:e,
            date2:f.date2
          }))}
        }
                
      />
      <DatePicker
        placeholderText="End Date"
        selected={fields["date2"]}
        onChange={e=>{
          setFields(f=>({
            date1:f.date1,
            date2:e
          }))}
        }
                
      />
      </>
      }
    </div>
  )
}

export default ShowFields
