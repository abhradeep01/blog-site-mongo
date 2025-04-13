import React from 'react'
import NavBar from '../navigation/NavBar'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <>
        <NavBar/>
        <Outlet/>
    </>
  )
}

export default Layout