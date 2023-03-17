import React from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import './HomeCMS.css'

function HomeCMS() {
  return (
    <div className='HomeCMS_Container'>
        <div className='HomeCMS_title'>
            <span>
                <FontAwesomeIcon icon={solid('cog')} />
            </span>
            <h1>CONFIGURACIÓN</h1>
        </div>
        {/* Grid section with four buttons */}
        <div className='HomeCMS_Grid'>
            <div className='HomeCMS_Grid_Item'>
                <Link to='home'>
                    <span>
                        <FontAwesomeIcon icon={solid('home')} />
                    </span>
                    <h2>Página Principal</h2>
                </Link>
            </div>
            <div className='HomeCMS_Grid_Item'>
                <Link to='nosotros'>
                    <span>
                        <FontAwesomeIcon icon={solid('users')} />
                    </span>
                    <h2>Nosotros</h2>
                </Link>
            </div>
            <div className='HomeCMS_Grid_Item'>
                <Link to='servicios'>
                    <span>
                        <FontAwesomeIcon icon={solid('tools')} />
                    </span>
                    <h2>Servicios</h2>
                </Link>
            </div>
            <div className='HomeCMS_Grid_Item'>
                <Link to='noticias'>
                    <span>
                        <FontAwesomeIcon icon={solid('newspaper')} />
                    </span>
                    <h2>Noticias</h2>
                </Link>
            </div>
        </div>

    </div>
  )
}

export default HomeCMS