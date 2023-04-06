import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import AARB_Logo_Nav from '../assets/color_logo.svg'
import './Nav.css'

function Nav(props) {
  const [menuMobileVisible, setMenuMobileVisible] = useState(false);
  const [navBarColor, setNavBarColor] = useState(false);
  const [navBarColorScroll, setNavBarColorScroll] = useState(false);
  const navRef = useRef(null);
  const menuMobile = useRef(null);

  function toggleMenu() {
    setMenuMobileVisible(prevState => !prevState);
  }

  useEffect(() => {
    if (props.headerHeight == 'no_header') {
      navRef.current.style.backgroundColor = '#002106';
    } else {
      const handleScroll = () => {
        const position = window.pageYOffset;
        if (position > props.headerHeight) {
          setNavBarColorScroll(true);
        } else {
          setNavBarColorScroll(false);
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll); 
    }
  }, [props.headerHeight]);

  function toggleMenu() {
    setMenuMobileVisible(prevState => !prevState);
    setNavBarColor(prevState => !prevState);
  }

  return (
    <nav className={`nav ${navBarColor ? 'colorful' : ''}
                         ${navBarColorScroll ? 'colorfulScroll' : ''}`} ref={navRef}>
      <div className="nav__home">
        <Link to="/">
          {/* <span>
            <FontAwesomeIcon icon={solid('seedling')} />
          </span> */}
          <img src={AARB_Logo_Nav} alt="AARB Logo" />
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