import React, {useState, useEffect, useCallback} from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
    doc,
    getDoc,
} from 'firebase/firestore';
import db from '../firestore'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import Nav from '../navBar/Nav';
import Footer from '../footer/Footer';
import Error404 from '../components/Error404';

import './NoticiaV.css'

function NoticiaV(props) {

  const { id } = useParams();

  const [Data, setData] = useState([]);
  const [dataLoaded , setDataLoaded] = useState(false);

  const getDocument = useCallback(async () => {
      const docRef = doc(db, 'news', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          return docSnap.data();
      } else {
          return null;
      }
  }, [id]);

  const shareOnFacebook = (event) => {
    event.preventDefault();
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  }

  useEffect(() => {
      async function fetchDataAndSetData() {
          const data = await getDocument();
          setData(data);
          setDataLoaded(true);
      }
      fetchDataAndSetData();
  }, [getDocument]);

  if (!dataLoaded) return (<div></div>);

  if (Data === null) {
    return (
      <Error404 />
    )
  } else {
    return (
      <div>
          <Nav headerHeight = 'no_header'/>
          <main className="noticiaV-main">
              <div className="noticiaV-title">
                  <h1>{Data.titulo}</h1>
                  <p>{Data.autor}</p>
                  <p>{new Date((Data.fecha).seconds * 1000 + (Data.fecha).nanoseconds / 1000000).toLocaleDateString('es-MX')}</p>
                  <Link className='noticiaV-regresar' to="/noticias">Regresar</Link>
                  <section className='share__buttons'>

                      <a onClick={shareOnFacebook} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={brands('facebook')} />
                      </a>

                      <a href={`whatsapp://send?text=${window.location.href}`} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={brands('whatsapp')} />
                      </a>
                      
                    </section>
              </div>
              <div className='noticiaV-content'>
                  <img src={Data.img} alt={Data.titulo} />
                  <p>{Data.contenido}</p>
              </div>
          </main>
          <Footer />
      </div>
    )
  }
}

export default NoticiaV