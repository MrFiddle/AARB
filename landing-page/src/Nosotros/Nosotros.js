import React, {useState, useEffect, useRef, useCallback} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { Carousel } from '@trendyol-js/react-carousel';
import ComiteMember from './ComiteMember';
import Nav from '../navBar/Nav'
import { useHeaderHeight } from '../components/HeaderHeight';
import './Nosotros.css'
import {
  collection,
  getDocs,
} from 'firebase/firestore';
import db from '../firestore'
import Footer from '../footer/Footer';

function Nosotros() {
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

	useEffect(() => {
		if (myDivRef.current && dataLoaded) {
			const height = myDivRef.current.clientHeight;
			setClientHeight(height);
		}
	}, [myDivRef, dataLoaded]);

  // DATA
  var content, image;
  content = Data[0]?.content;
  image = Data[0]?.img1;

  let comite = Data[0]?.comite;
  let sortedData;

  if (!dataLoaded) {
    return <div></div>
  } else {
    sortedData = Object.entries(comite)
    .sort(([, a], [, b]) => a.order - b.order)
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
    console.log(sortedData)
  }

  return (
    <div>
      <Nav headerHeight={clientHeight}/>
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

            {Object.entries(sortedData).map(([key, value]) => {
              return (
                <ComiteMember
                  key={key}
                  nombre={value.nombre}
                  cargo={value.cargo}
                  img={value.img}
                  />
              )
            })
            }

              </Carousel>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default Nosotros