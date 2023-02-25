import React, { useEffect, useRef, useState } from 'react'
import { Router, Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import './Nav.css'

function Nav(props) {
  const [menuMobileVisible, setMenuMobileVisible] = useState(false);
  const navRef = useRef(null);

  function toggleMenu() {
    setMenuMobileVisible(prevState => !prevState);
  }

  return (
    <nav className={'nav'} ref={navRef}>
      <div className="nav__home">
        <Link to="/">
          <span>
            <FontAwesomeIcon icon={solid('seedling')} />
          </span>
        </Link>
      </div>
      <div className="nav__bar" onClick={toggleMenu}>
        <span>
          <FontAwesomeIcon icon={solid('bars')} />
        </span>
      </div>
      <div className="nav__menuDesktop">
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/noticias">Noticias</Link>
        <Link to="/servicios">Servicios</Link>
      </div>
      <div className={`nav__menuMobile ${menuMobileVisible ? 'visible' : ''}`}>
        <Link to="/nosotros" className="nav-menuMobile__element">
          <span>
            <FontAwesomeIcon icon={solid('users')} />
          </span>
          <p>Nosotros</p>
        </Link>
        <Link to="/noticias" className="nav-menuMobile__element">
          <span>
            <FontAwesomeIcon icon={solid('newspaper')} />
          </span>
          <p>Noticias</p>
        </Link>
        <Link to="/servicios" className="nav-menuMobile__element">
          <span>
            <FontAwesomeIcon icon={solid('tools')} />
          </span>
          <p>Servicios</p>
        </Link>
      </div>
    </nav>
  );
}

export default Nav