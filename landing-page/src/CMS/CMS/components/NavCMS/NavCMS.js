import React from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import './NavCMS.css'

function NavCMS() {
  return (
    <div className='NavCMS'>
        <div className='NavCMS_Container'>
          <Link to='/adminCMS/panel' className='NavCMS_item especial'>
            <h1>Inicio</h1>
          </Link>

          <Link to='home' className='NavCMS_item'>
            <span>
              <FontAwesomeIcon icon={solid('home')} />
            </span>
            <h1>Página Principal</h1>
          </Link>
          <Link to='/adminCMS/panel' className='NavCMS_item'>
            <span>
              <FontAwesomeIcon icon={solid('users')} />
            </span>
            <h1>Nosotros</h1>
          </Link>
          <Link to='/adminCMS/panel' className='NavCMS_item'>
            <span>
              <FontAwesomeIcon icon={solid('tools')} />
            </span>
            <h1>Servicios</h1>
          </Link>
          <Link to='/adminCMS/panel' className='NavCMS_item'>
            <span>
              <FontAwesomeIcon icon={solid('newspaper')} />
            </span>
            <h1>Noticias</h1>
          </Link>
        </div>
        <Outlet/>
    </div>
  )
}

export default NavCMS