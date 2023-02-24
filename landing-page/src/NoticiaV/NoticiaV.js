import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
    getDoc,
    query,
    where,
    orderBy,
    enableIndexedDbPersistence,
    limit,
} from 'firebase/firestore';
import db from '../firestore'

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

  useEffect(() => {
      async function fetchDataAndSetData() {
          const data = await getDocument();
          setData(data);
          setDataLoaded(true);
      }
      fetchDataAndSetData();
  }, [getDocument]);

  console.log(Data);

  if (!dataLoaded) return (<div></div>);

  if (Data === null) {
    return (
      <Error404 />
    )
  } else {
    return (
      <div>
          <Nav />
          <main className="noticiaV-main">
              <div className="noticiaV-title">
                  <h1>{Data.titulo}</h1>
                  <p>{Data.autor}</p>
                  <p>{new Date((Data.fecha).seconds * 1000 + (Data.fecha).nanoseconds / 1000000).toLocaleDateString('es-MX')}</p>
                  <Link className='noticiaV-regresar' to="/noticias">Regresar</Link>
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

  return (
    <div>
        <Nav />
        <main className="noticiaV-main">
            <div className="noticiaV-title">
                <h1>Noticia de prueba</h1>
                <p>01-01-01</p>
            </div>
            <div className='noticiaV-content'>
                <img src="https://picsum.photos/800/400" alt="Noticia de prueba" />
                <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee.</p>
            </div>
        </main>
        <Footer />
    </div>
  )
}

export default NoticiaV