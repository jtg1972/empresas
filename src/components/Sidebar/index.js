import React,{useState} from 'react'
import CreateBusinessDialog from '../CreateBusinessDialog';
import {MdAddCircleOutline} from 'react-icons/md'
import './styles.scss'

const Sidebar = () => {
  const [openCreateBusiness,setOpenCreateBusiness]=useState(false);
  const toggleCreateBusiness=()=>setOpenCreateBusiness(!openCreateBusiness)
  return (
      <div className="sidebar">
        <ul>
          <li className="bu-sidebar">
            Negocio 
            <a onClick={()=>toggleCreateBusiness()}>
              <MdAddCircleOutline className="add"/>
            </a>
          </li>
        </ul>
         
          <CreateBusinessDialog 
            toggleDialog={toggleCreateBusiness}
            openDialog={openCreateBusiness}/>
      </div>
    )
  }
export default Sidebar;
