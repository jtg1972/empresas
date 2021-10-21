import React,{useState} from 'react'
import './styles.scss'

import Navbar from '../../components/Navbar'
import SidebarBusiness from '../../components/SidebarBusiness';
import SidebarEnterprises from '../../components/SidebarEnterprises';
export const MainLayoutProducts = ({children}) => {
  const [business,setBusiness]=useState(0);
  return (
    <div className="mainLayout">
      <Navbar/>
      <div className="sidebarMenuAndContent">
        {/*<SidebarBusiness setBusiness={setBusiness}></SidebarBusiness>
        <SidebarEnterprises businessId={business}/>*/}
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  )
}
export default MainLayoutProducts;
