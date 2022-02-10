import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchClients } from '../../../../redux/clients/actions'
import Dialog from '../../../Dialog'
import FormButton from '../../../Forms/FormButton'
import FormInput from '../../../Forms/FormInput'
import DisplaySearchedClients from './DisplaySearchedClients'
import './styles.scss'

const mapToState=({clients})=>({
  allClients:clients.allClients,
  searchedClients:clients.searchedClients
})

const SearchClients = ({
  openDialog,
  toggleDialog
}) => {
  const [search,setSearch]=useState("")
  const dispatch=useDispatch();
  const {
    allClients,
    searchedClients
  }=useSelector(mapToState)

  
  const closeDialog=()=>{
    toggleDialog();
  }

  

  const dialogConfig={
    headline:`Searching Clients`,
    open:openDialog,
    closeDialog:()=>closeDialog(),
  }

  const inputSearchCategoryConfig={
    onChange:(e)=>setSearch(e.target.value),
    placeholder:"Search client",
    value:search
  }
  const buttonSearchCategoryConfig={
    onClick:()=>{
      dispatch(searchClients(
        search
      ))
    }
  }

  
  return (
    openDialog &&
    <Dialog
      {...dialogConfig}
    >
      
      <FormInput 
        {...inputSearchCategoryConfig}
      />
      
      <FormButton
        {...buttonSearchCategoryConfig}   
      >
        Search
      </FormButton>

        <DisplaySearchedClients
          searchedClients={searchedClients}
          toggleDialog={toggleDialog}
       />
    </Dialog>
  )
}

export default SearchClients
