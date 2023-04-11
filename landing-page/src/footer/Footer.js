import React, {useState, useEffect, useCallback} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import {
  getDocs,
  collection
} from 'firebase/firestore';
import db from '../firestore'
import AARB_Logo from '../assets/white_nav.svg'
import './Footer.css'

function Footer() {
    
  const [Data, setData] = useState([]);
  const [ContactData, setContactData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);


  const fetchData = useCallback(async () => {
    const footerQuerySnapshot = await getDocs(collection(db, 'footer'));
    const footerData = footerQuerySnapshot.docs.map((doc) => doc.data());
    setData(footerData);

    const mainPageQuerySnapshot = await getDocs(collection(db, 'mainPage'));
    const mainPageData = mainPageQuerySnapshot.docs.map((doc) => doc.data());
    setContactData(mainPageData);

    setDataLoaded(true);
}, []);
  
useEffect(() => {
    fetchData();
}, [fetchData]);

  // DATA
  var footerContent, footerPhone, footerMail;
  const year = new Date().getFullYear()

  if (!dataLoaded) {
    return <div></div>
  } else {
    footerContent = Data[0].content;
    footerPhone = ContactData[1].phone;
    footerMail = ContactData[1].email;
  }
  

  return (
    <div className='footer'>
        <img src={AARB_Logo} alt="logo" id="hero__logo" className='footer__logo'/>
        <div class="footer__content">
            <p id="footer__content">{footerContent}</p>
        </div>
        <div class="footer__contact">
            <p id="footer-contact__phone">Tel: {footerPhone}</p>
            <p id="footer-contact__mail">Email: {footerMail}</p>
        </div>
        <div class="footer__sections">
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/servicios">Servicios</Link>
            <Link to="/noticias">Noticias</Link>
        </div>
        <div class="footer__rights">
            <p><span id="footer__year">{year}</span> - Asociación de Agricultores Del Río Baluarte</p>
            <p>Todos los derechos reservados.</p>
        </div>
    </div>
  )
}

export default Footer