import React,{useState,useEffect} from 'react'
import { BsExclamationSquareFill } from 'react-icons/bs'
import { FaBorderNone, FaCreativeCommonsSamplingPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addFieldCriteria, fetchFilterResults, removeFieldCriteria } from '../../redux/structure/actions'
import Dialog from '../Dialog'
import DisplayFields from '../DisplayFields'
import FormButton from '../Forms/FormButton'
import FormInput from '../Forms/FormInput'

const mapToState=({structure})=>({
  products:structure.productsFromStructure,
  formFields:structure.formFields,
  fieldCriterias:structure.fieldCriterias
})

const AddFilter = ({
  openDialog,
  toggleDialog,
  values,
  setValues
}) => {

  const {formFields,fieldCriterias}=useSelector(mapToState)
  const [fields,setFields]=useState({})
  const [currentField,setCurrentField]=useState({})
  const [addField,setAddField]=useState(false);
  const [order,setOrder]=useState("")
  //const [values,setValues]=useState({})
  const dispatch=useDispatch()
  const [operator,setOperator]=useState("igual")
  useEffect(()=>{
    console.log("formfields",formFields)
    let fIn={}
    formFields.forEach(ff=>{
      console.log("FF",ff)
      ff.fields.forEach(f=>{
        const fieldName=f.fieldName
        fIn={...fIn,[fieldName]:f}
      })

    })
    console.log("FIn",fIn)
    setFields(fIn)
  },[formFields])

 
  const displayMultiValue=(campo)=> {
    return (
        <div style={{marginBottom:"5px",display:"flex",alignItems:"center"}}>  
          <span style={{display:"block"}}>{campo.fieldName}</span>
          <span style={{display:"block"}}>&nbsp;is&nbsp; </span>
          <select style={{flex:1,outline:"none"}}
            onChange={(e)=>{
              setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],val:e.target.value}}))         
            }}
            value={values[campo.fieldName]?.val}
          >
            <option value="">Select an option</option>
            {campo.values.map(v=>{
              return <option value={v.value}>{v.value}</option>
            })}
          </select>
          <FormButton style={{width:"auto",marginLeft:"3px",marginTop:"0"}}
          onClick={()=>{
            dispatch(removeFieldCriteria(campo.fieldName))
            delete values[campo.fieldName]
          
          }}>-</FormButton>
          <FormButton style={{width:"auto",marginLeft:"3px", marginBottom:"2px",marginTop:"0"}}
            onClick={()=>{
              setOrder("asc")
              setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],order:"asc"}}))

            }}>U</FormButton>
          <FormButton style={{width:"auto",marginLeft:"3px", marginBottom:"2px",marginTop:"0"}}
            onClick={()=>{
              setOrder("desc")
              setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],order:"desc"}}))

            }}>D</FormButton>
       </div>
  )
}
    

const displaySingleValueString=(campo)=>{
      return (<div style={{marginBottom:"5px",display:"flex",alignItems:"center"}}>  
        <span style={{display:"block"}}>{campo.fieldName} contains</span>&nbsp;
        <FormInput 
        style={{flex:1,marginBottom:"0",border:"none",borderBottom:"1px solid grey"}}
        value={values[campo.fieldName]?.val}
        onChange={(e)=>{
              setValues(values=>({...values,[campo.fieldName]:{...values[campo.fieldName],val:e.target.value}}))
          }
        }
        placeholder={campo.fieldName}/>
        <FormButton style={{width:"auto",marginLeft:"3px", marginBottom:"2px",marginTop:"0"}}
        onClick={()=>{
          dispatch(removeFieldCriteria(campo.fieldName))
          delete values[campo.fieldName]
        }
        }>-</FormButton>
        <FormButton style={{width:"auto",marginLeft:"3px", marginBottom:"2px",marginTop:"0"}}
        onClick={()=>{
          
          setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],order:"asc"}}))

        }}>U</FormButton>
        <FormButton style={{width:"auto",marginLeft:"3px", marginBottom:"2px",marginTop:"0"}}
        onClick={()=>{
          
          setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],order:"desc"}}))

        }}>D</FormButton>
    </div>)
  }
  
const displaySingleValueNumber=(campo)=>{
  return (<div style={{marginBottom:"5px",display:"flex",alignItems:"center"}}>  
    <span style={{display:"block"}}>{campo.fieldName} </span>
    <select 
    style={{flex:1,outline:"none"}}
    value={operator}
    onChange={(e)=>{
      setOperator(e.target.value)
      setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],operator:e.target.value}}))
    }}

    >
      <option value="igual"> igual </option>
      <option value="menor"> menor que </option>
      <option value="mayor"> mayor que </option>
    </select>
    <FormInput 
      value={values[campo.fieldName]?.val!==undefined?
      values[campo.fieldName].val:""} 
      onChange={(e)=>{
            setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],val:e.target.value}}))
      }}
      placeholder={campo.fieldName}
      style={{marginBottom:0,marginBottom:"0",border:"none",borderBottom:"1px solid grey"
    }}/>
    <FormButton style={{width:"auto",marginLeft:"3px",marginTop:"0"}}
    onClick={()=>{
      dispatch(removeFieldCriteria(campo.fieldName))
      delete values[campo.fieldName]
    }}
    >-</FormButton>
    <FormButton style={{width:"auto",marginLeft:"3px", marginBottom:"2px",marginTop:"0"}}
      onClick={()=>{
        setOrder("asc")
        setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],order:"asc"}}))

      }}>U</FormButton>
    <FormButton style={{width:"auto",marginLeft:"3px", marginBottom:"2px",marginTop:"0"}}
      onClick={()=>{
        setOrder("desc")
        setValues(v=>({...v,[campo.fieldName]:{...v[campo.fieldName],order:"desc"}}))

      }}>D</FormButton>
  </div>)
}

  
  return (
    <Dialog
      open={openDialog}
      closeDialog={toggleDialog}
      headline="Añadir Filtros"
    >
      {Object.keys(fields).length==fieldCriterias.length?
        <p style={{background:"red",color:"white",padding:"5px",marginBottom:"5px"}}>All fields are taken</p>:
        !addField?
        (<FormButton style={{marginBottom:"5px"}} onClick={()=>{
          setAddField(true)}}>Add Field</FormButton>):
          (<select onChange={(e)=>{
        console.log("cf",e.target.value)
        const est=fields[e.target.value]
        console.log("est",est)
        setCurrentField(est)
        setAddField(false)
        dispatch(addFieldCriteria(est))

      }}
      style={{padding:0,background:"red",fontSize:"1.2rem",color:"white",padding:"5px"}}
      >
        <option value="">Select a field</option>
        {formFields.map(ff=>{
          const found=fieldCriterias.filter(fc=>{
            console.log("foundstr",fc.fieldName,ff.fieldName)
            return fc.fieldName==ff.fieldName
          })
          console.log("found",found)
          if(found.length==1){
            console.log("lo encontro")
            return null;
          }
          
          return ff.fields.map((fd,i)=>{
            const found=fieldCriterias.filter(fc=>{
              console.log("foundstr",fc.fieldName,fd.fieldName)
              return fc.fieldName==fd.fieldName
            })
            console.log("found",found)
            if(found.length==1){
              console.log("lo encontro")
              return null;
            }else{
              return <option key={i} value={fd.fieldName}>{fd.fieldName}</option>
            }
              
          }
          )
        })}
      </select>)}

      {
        fieldCriterias.length && fieldCriterias.map((fc)=>{
          if(fc.dataType=="multipleValue")
            return displayMultiValue(fc)
          else if(fc.dataType=="singleValue"){
            if(fc.declaredType=="string")
              return displaySingleValueString(fc)
            else
              return displaySingleValueNumber(fc)

          }
          
        })
      }
      {Object.keys(values).length>0 ? <FormButton
        onClick={()=>{
          console.log("values",values)
          dispatch(fetchFilterResults(values))
        }}
      >Filter now</FormButton>:<p>Igual a cero</p>}
      
      
      
    </Dialog>
  )
}

export default AddFilter
