import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Pages/Shared/Footer/Footer'
import Nav from './../Pages/Shared/Nav/Nav';

const Main = () => {

  const location = useLocation() ; 
  const currPath = location.pathname.includes('/login') || location.pathname.includes('/register')
  return (
    <div>
       { currPath || <Nav /> }
      <Outlet />
      <Footer />
    </div>
  )
}

export default Main