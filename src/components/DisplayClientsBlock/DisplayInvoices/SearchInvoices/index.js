import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchClients } from '../../../../redux/clients/actions'
import { searchInvoices } from '../../../../redux/invoices/actions'
import { getStructureClient } from '../../../../redux/structure/actions'
import Dialog from '../../../Dialog'
import DisplayFields from '../../../DisplayFields'
import FormButton from '../../../Forms/FormButton'
import FormInput from '../../../Forms/FormInput'
import DisplaySearchedInvoices from './DisplaySearchedInvoices'
import ShowFields from './ShowFields'
import './styles.scss'

const mapToState=({invoices,structure})=>({
  allInvoices:invoices.allInvoices,
  searchedInvoices:invoices.searchedInvoices,
  structureClient:structure.structureClient,
})

const SearchInvoices = ({
  openDialog,
  toggleDialog
}) => {
  const [search,setSearch]=useState("")
  const [searchField,setSearchField]=useState("")
  const [fieldStructure,setFieldStructure]=useState({})
  const dispatch=useDispatch();
  const [fields,setFields]=useState({})
  const {
    allInvoices,
    searchedInvoices,
    structureClient
  }=useSelector(mapToState)

  useEffect(()=>{
    dispatch(getStructureClient(5))
  },[openDialog])

  useEffect(()=>{
    getFieldStructure()
  },[searchField])

  
  const closeDialog=()=>{
    toggleDialog();
  }

  

  const dialogConfig={
    headline:`Searching Invoices`,
    open:openDialog,
    closeDialog:()=>closeDialog(),
  }

  const buttonSearchCategoryConfig={
    onClick:()=>{
      dispatch(searchInvoices({
        fields,
        searchField,
        fieldStructureType:fieldStructure.declaredType
      }))
    }
  }
  
  const getFieldStructure=()=>{
    if(searchField=="id"){
      setFieldStructure(
        {
          fieldName:"id",
          displayName:"Id",
          dataType:"singleValue",
          declaredType:"numeric"
        })
    }else if(searchField!==""){
      const st=structureClient.fields.find(e=>
        e.fieldName==searchField  
      )
      setFieldStructure(st)
    }
    
  }
  
  return (
    openDialog &&
    <Dialog
      {...dialogConfig}
    >
      <select onChange={(e)=>{
        setSearchField(e.target.value)
      
      }
      }>
        <option value="">Select a field to Search</option>
        <option value="id">Invoice Id</option>
        {structureClient.fields.map((c)=>{
          
          return <option value={c.fieldName}>
            {c.displayName}
          </option>
          
        })}
      </select>
      <ShowFields fieldStructure={fieldStructure}
        setFields={setFields}
        fields={fields}/>
      
      <FormButton
        {...buttonSearchCategoryConfig}   
      >
        Search
      </FormButton>

        <DisplaySearchedInvoices
          searchedInvoices={searchedInvoices}
          toggleDialog={toggleDialog}
        />
    </Dialog>
  )
}

export default SearchInvoices
