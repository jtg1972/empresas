import React from 'react'
import './styles.scss'

import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar';
export const MainLayout = ({children}) => {
  return (
    <div className="mainLayout">
      <Navbar/>
      <div className="sidebarMenuAndContent">
        <Sidebar></Sidebar>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  )
}
export default MainLayout;
