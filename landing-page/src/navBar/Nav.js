import React, { useEffect, useRef, useState } from 'react'
import { Router, Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import './Nav.css'

function Nav(props) {
  const [menuMobileVisible, setMenuMobileVisible] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const navRef = useRef(null);
  const menuMobile = useRef(null);

  function toggleMenu() {
    setMenuMobileVisible(prevState => !prevState);
  }

  useEffect(() => {
    function handleScroll() {
      setScrollHeight(window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [props.headerHeight]);

  if (window.scrollY > (props.headerHeight) + 1) {
    navRef.current.style.background = '#002106';
  } else {
    if (navRef.current) {
      navRef.current.style.background = 'none';
    }
  }

  if (menuMobileVisible) {
    navRef.current.style.background = '#002106';
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
        <p style={{backgroundColor: 'red'}}>current scroll: {scrollHeight}</p>
        <p style={{backgroundColor: 'yellow'}}>header height: {props.headerHeight}</p>
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