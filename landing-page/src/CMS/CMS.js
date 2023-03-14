import React from 'react'
import { Outlet, Route, Router, Routes } from 'react-router-dom'
import './CMS.css'

import NavCMS from './NavCMS'
import HomeCMS from './Cards/HomeCMS/HomeCMS'
import MainPage from './Cards/MainPageCMS/MainPage'

function CMS() {
  return (
    <div className='CMS_Container'>
        <NavCMS/>
        <Outlet/>
    </div>
  )
}

export default CMS