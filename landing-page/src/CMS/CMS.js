import React from 'react'
import { Outlet } from 'react-router-dom'
import './CMS.css'

import NavCMS from './NavCMS'

function CMS() {
  return (
    <div className='CMS_Container'>
        <NavCMS/>
        <Outlet/>
    </div>
  )
}

export default CMS