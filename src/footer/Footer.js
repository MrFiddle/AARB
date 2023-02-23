import React, {useState, useEffect, useRef, useCallback} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
	enableIndexedDbPersistence,
  limit,
} from 'firebase/firestore';
import db from '../firestore'
import './Footer.css'

function Footer() {
    
  const [Data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'footer'));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
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
    footerPhone = Data[0].phone;
    footerMail = Data[0].email;
  }
  

  return (
    <div className='footer'>
        <span>
            <FontAwesomeIcon icon={solid('seedling')} />
        </span>
        <div class="footer__content">
            <p id="footer__content">{footerContent}</p>
        </div>
        <div class="footer__contact">
            <p id="footer-contact__phone">Tel: {footerPhone}</p>
            <p id="footer-contact__mail">Email: {footerMail}</p>
        </div>
        <div class="footer__sections">
            <a href="./nosotros/nosotros.html">Nosotros</a>
            <a href="./servicios/servicios.html">Servicios</a>
            <a href="./noticias/noticias.html">Noticias</a>
        </div>
        <div class="footer__rights">
            <p><span id="footer__year">{year}</span> - Asociación de Agricultores Del Río Baluarte</p>
            <p>Todos los derechos reservados.</p>
        </div>
    </div>
  )
}

export default Footer