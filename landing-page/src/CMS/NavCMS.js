import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import './NavCMS.css'

function NavCMS() {

  const [currentRoute, setCurrentRoute] = useState('')
  const location = useLocation()

  useEffect(() => {
    setCurrentRoute(localStorage.getItem('currentRoute'))
  }, [location])

  return (
    <div className='NavCMS'>
        <div className='NavCMS_Container'>
          <Link to='/adminCMS' className={`NavCMS_item ${currentRoute === 'HomeCMS' ? 'especial' : ''}`}>
            <h1>Inicio</h1>
          </Link>

          <Link to='home' className={`NavCMS_item ${currentRoute === 'MainPageCMS' ? 'especial' : ''}`}>
            <span>
              <FontAwesomeIcon icon={solid('home')} />
            </span>
            <h1>Página Principal</h1>
          </Link>
          <Link to='nosotros' className={`NavCMS_item ${currentRoute === 'NosotrosCMS' ? 'especial' : ''}`}>
            <span>
              <FontAwesomeIcon icon={solid('users')} />
            </span>
            <h1>Nosotros</h1>
          </Link>
          <Link to='servicios' className={`NavCMS_item ${currentRoute === 'ServiciosCMS' ? 'especial' : ''}`}>
            <span>
              <FontAwesomeIcon icon={solid('tools')} />
            </span>
            <h1>Servicios</h1>
          </Link>
          <Link to='noticias' className={`NavCMS_item ${currentRoute === 'NoticiasCMS' ? 'especial' : ''}`}>
            <span>
              <FontAwesomeIcon icon={solid('newspaper')} />
            </span>
            <h1>Noticias</h1>
          </Link>
        </div>
    </div>
  )
}

export default NavCMS