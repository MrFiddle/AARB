import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react'
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

import Nav from '../navBar/Nav';
import Footer from '../footer/Footer';
import './Servicios.css'

function Servicios() {

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

  console.log(Data);
  let content;

  if (!dataLoaded) {
    return <div></div>
  } else {
    content = Data[0]?.servicios;
    console.log(content);
  }
  return (
    <div>
      <Nav />
      <header className='servicios_header'>
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
            <form class="servicios_form" action="https://formsubmit.co/jppd0657@gmail.com" method="post">
                <h2>¿Interesado en algún servicio?</h2>
                <input type="text" name="Nombre" id="" placeholder="Nombre" class="servicios_form__box"></input>
                <select name="" id="" class="servicios_form__select">
                    <option value="Deshidratadora">Deshidratadora</option>
                    <option value="Deshidratadora">Deshidratadora</option>
                    <option value="Deshidratadora">Deshidratadora</option>
                </select>
                <input type="email" name="email" id="" placeholder="Correo electrónico" class="servicios_form__box"></input>
                <input type="text" name="telefono" id="" placeholder="Teléfono" class="servicios_form__box"></input>
                <textarea name="details" id="" cols="30" rows="10" class="servicios_form__textArea" placeholder="Detalles"></textarea>
                <button class="servicios_form__button button">
                    <p>Enviar</p>
                </button>
            </form>

    </div>
    </div>
  )
}

export default Servicios