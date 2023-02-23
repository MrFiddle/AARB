import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { Carousel, ScrollingCarousel } from '@trendyol-js/react-carousel';
import ComiteMember from './ComiteMember';
import LArrow from './elements/LArrow';
import Nav from '../navBar/Nav'
import './Nosotros.css'
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
import Footer from '../footer/Footer';

function Nosotros() {
  const [isNavTransparent, setIsNavTransparent] = useState(true);
	const myDivRef = useRef(null);
	const [clientHeight, setClientHeight] = useState(null);

  const [Data, setData] = useState([]);
  const [dataLoaded , setDataLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'aboutUs'));
    return querySnapshot.docs.map((doc) => doc.data());
  }, []);

  useEffect(() => {
    async function fetchDataAndSetData() {
      const data = await fetchData();
      setData(data);
      setDataLoaded(true);
    }
    fetchDataAndSetData();
  }, [fetchData]);

  console.log(Data);

	useEffect(() => {
		if (myDivRef.current) {
			const height = myDivRef.current.clientHeight;
			setClientHeight(height);
		}
	}, [myDivRef]);

  // DATA
  var content, image;
  content = Data[0]?.content;
  image = Data[0]?.img1;

  let test = {
    "presidente": [
      "Juan Perez",
      "Presidente",
      "url.com",
      1,
    ],
    "vicepresidente": [
      "Juan Perez",
      "Vicepresidente",
      "url.com",
      2,
    ],
    "secretario": [
      "Juan Perez",
      "Secretario",
      "url.com",
      3,
    ],
  }

  console.log(test["presidente"][0]);
  let comite = Data[0]?.comite;
  let sortedComite;

  // let presidenteName = comite['presidente'][0];
  // console.log(comite);
  // console.log(comite['presidente'][0]);

  if (!dataLoaded) {
    return <div></div>
  } else {
    const sortedEntries = Object.entries(comite).sort((a, b) => a[1][3] - b[1][3]);
    sortedComite = Object.fromEntries(sortedEntries);
    console.log(sortedComite);
    console.log(comite);
  }

  return (
    <div>
      <Nav headerHeight = {clientHeight}/>
      <header className='nosotros_header' ref={myDivRef}>
        <span>
          <FontAwesomeIcon icon={solid('people-group')} />
        </span>
        <h1>¿Quienes somos?</h1>
      </header>
      <main className='nosotros_main'>
        <section class="title">
            <h1>A.A.R.B</h1>
            <p>Asociación de Agricultores del Río Baluarte</p>
        </section>
        <section class="image">
            <img src={image}/>
        </section>
        <section class="content">
            <p id="nosotros__content">{content}</p>
        </section>
        <section class="comite">
            <h1 class="comite__title">COMITE DIRECTIVO</h1>
              <Carousel
              slide={1}
              infinite={true}
              swiping={true}
              show={1}
              responsive={true}
              swipeOn={0.1}
              useArrowKeys={true}
              >

                {Object.keys(sortedComite).map((key) => {
                  const [nombre, cargo, img] = sortedComite[key];
                  return (
                    <ComiteMember nombre={nombre} cargo={cargo} img={img}/>
                  )
                })}

              </Carousel>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default Nosotros