import React, {useState, useEffect, useCallback, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import {
    collection,
    getDocs,
} from 'firebase/firestore';
import db from '../firestore'

import Nav from '../navBar/Nav';
import Footer from '../footer/Footer';
import './Servicios.css'

function Servicios() {

  const myDivRef = useRef(null);
  const [clientHeight, setClientHeight] = useState(null);
  const [Data, setData] = useState([]);
  const [dataLoaded , setDataLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'servicios'));
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

  let content;
  let form_mail;

  if (!dataLoaded) {
    return <div></div>
  } else {
    content = Data[0]?.servicios;
    form_mail = "https://formsubmit.co/" + Data[0]?.contact_email;
  }
  return (
    <div>
      <Nav headerHeight = {clientHeight}/>
      <header className='servicios_header' ref={myDivRef}
      
      style={{
        background: `linear-gradient(
            rgba(0, 0, 0, 0.6), 
            rgba(0, 0, 0, 0.6)
        ),
        url(${Data[0]?.bg_img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      
      >
        <span>
            <FontAwesomeIcon icon={solid('people-group')} />
        </span>
        <h1>Nuestros servicios</h1>
      </header>
      <div className='servicios_main'>
            
            <section class="service__container">
                
                {Object.keys(content).map((key) => {
                    return (
                        <section class="service">
                            <h1>{content[key].title}</h1>
                            <p>{content[key].content}</p>
                            <img src={content[key].img} alt=""/>
                        </section>
                    )
                })}; 

            </section>
            <form class="servicios_form" action={form_mail} method="post">
                <h2>¿Interesado en algún servicio?</h2>
                <input type="text" name="Nombre" id="" placeholder="Nombre" class="servicios_form__box"></input>
                <select name="" id="" class="servicios_form__select">
                    {Object.keys(content).map((key) => {
                      return (
                        <option value={content[key].title}>{content[key].title}</option>
                      )
                    })
                    }
                </select>
                <input type="email" name="email" id="" placeholder="Correo electrónico" class="servicios_form__box"></input>
                <input type="text" name="telefono" id="" placeholder="Teléfono" class="servicios_form__box"></input>
                <textarea name="details" id="" cols="30" rows="10" class="servicios_form__textArea" placeholder="Detalles"></textarea>
                <button class="servicios_form__button button">
                    <p>Enviar</p>
                </button>
            </form>
            <Footer/>
    </div>
    </div>
  )
}

export default Servicios