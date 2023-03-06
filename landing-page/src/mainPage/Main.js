import React, {useState, useEffect, useRef, useCallback} from 'react'
import './Main.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import {
  collection,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import db from '../firestore'
import { useNavigate } from 'react-router-dom';

import Nav from '../navBar/Nav'
import { useHeaderHeight } from '../components/HeaderHeight';
import Footer from '../footer/Footer'
import Card from '../components/Card'
import Button from '../components/Button'
import 'react-open-weather-widget/lib/css/ReactWeather.css';
import AARB_Logo_Color from '../assets/color_logo.svg'

function Main() {

    const history = useNavigate();
    
	const myDivRef = useRef(null);
	const [clientHeight, setClientHeight] = useState(null);
    
    const [Data, setData] = useState([]);
    const [New, setNew] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    
    const fetchData = useCallback(async () => {
      const querySnapshot = await getDocs(collection(db, 'mainPage'));
      const querySnapshot2 = await getDocs(query(collection(db, "news"), orderBy("fecha", "desc")));
      const data = querySnapshot.docs.map((doc) => doc.data());
      const data2 = querySnapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(data);
      setNew(data2);
      setDataLoaded(true);
    }, []);
    
    useEffect(() => {
      if (myDivRef.current && dataLoaded) {
        const height = myDivRef.current.clientHeight;
        setClientHeight(height);
      }
    }, [myDivRef, dataLoaded]);
    
    useEffect(() => {
      fetchData();
    }, [fetchData]);

	var orgName, background_image, orgLogo, orgSlogan; /* Header */
	var cardTitle, cardFecha, cardImg, cardId; /* New Card */
	var aboutUsContent, aboutUsImage /* Nosotros */
	var contactAddress, contactHorario, contactPhone, contactEmail, contactFacebook, contactWhatsapp, contactMaps; /* Contacto */
	var serviciosContent, serviciosImage; /* Servicios */

	if (!dataLoaded) {
		return <div></div>;
	} else {
		orgName = Data[2]['org_name'];
		orgSlogan = Data[2]['org_slogan'];
		orgLogo = Data[2]['org_logo'];
		background_image = Data[2]['background_image'];

		cardTitle = New[0]['titulo'];
		cardFecha = New[0]['fecha'];
		var cardFechaConverted = new Date(cardFecha.seconds * 1000 + cardFecha.nanoseconds / 1000000).toLocaleDateString('es-MX');
		cardImg = New[0]['img'];
        cardId = New[0]['id'];

		aboutUsContent = Data[0]['content'];
		aboutUsImage = Data[0]['image'];

		contactAddress = Data[1]['address'];
		contactHorario = Data[1]['horario'];
		contactPhone = Data[1]['phone'];
		contactEmail = Data[1]['email'];
		contactFacebook = Data[1]['facebook'];
		contactWhatsapp = Data[1]['whatsapp'];
		contactMaps = Data[1]['maps'];

		serviciosContent = Data[4]['content'];
		serviciosImage = Data[4]['image'];
	}

    function handleClick(newId) {
        // window.location.href = '/noticias/' + newId;
        history('/noticias/' + newId);
    }

    function buttonClick(ruta) {
       history('/' + ruta);
    }

    function buttonClickExternal(url) {
        window.open(url);
    }

    const contactoSection = document.querySelector('.contacto');

  return (

    <div className='main__component'>
        <Nav headerHeight = {clientHeight}/>
        <header className='main_header' ref={myDivRef}>

            <img src={AARB_Logo_Color} alt="logo" id="hero__logo"/>
            <p id="hero__slogan">{orgSlogan}</p>
						<Button url="#contacto" text="Contactanos" width="200px"
                        onClick={() => {contactoSection.scrollIntoView({behavior: 'smooth'})}}/>
        </header>

        <main className='main-Main'>
            <section class="noticias">
                <div class="noticias__title">
                    <span>
                        <i class="fa-solid fa-newspaper"></i>
                        <FontAwesomeIcon icon={solid('newspaper')} />
                    </span>
                    <h2>ÚLTIMAS NOTICIAS</h2>
                </div>

                <Card title={cardTitle} date={cardFechaConverted} backgroundImage={cardImg} onClick={() => handleClick(cardId)}/>

                <Button text="Ver más" onClick={() => buttonClick('noticias')}/>
            </section>

            <section class="nosotros">
                <div class="nosotros__title">
                    <span>
                        <FontAwesomeIcon icon={solid('users')} />
                    </span>
                    <h2>¿QUIENES SOMOS?</h2>
                </div>

                <div class="nosotros__content">
                    <p id="nosotros__content">{aboutUsContent}</p>
                    <div class="nosotros__img">
                        <img id="nosotros__img" src={aboutUsImage} alt="imagen sección nosotros"/>
                    </div>

                    <Button text="Conoce más sobre nosotros" onClick={() => buttonClick('nosotros')}/>
                </div>
            </section>

            <section className='clima'>
                <a class="weatherwidget-io" href="https://forecast7.com/es/22d99n105d86/el-rosario/" data-label_1="EL ROSARIO" data-icons="Climacons Animated" data-theme="weather_one" >EL ROSARIO</a>
            </section>

            <section className='servicios'>
                <div class="servicios__title">
                    <span>
                        <FontAwesomeIcon icon={solid('tools')} />
                    </span>
                    <h2>NUESTROS SERVICIOS</h2>
                </div>
                <div class="servicios__content">
                    <p id="servicios__content">{serviciosContent}</p>
                    <div class="servicios__img">
                        <img id="nosotros__img" src={serviciosImage} alt="imagen sección nosotros"/>
                    </div>
                </div>
                <Button text="Conoce todos nuestros servicios" onClick={() => history('/servicios')}/>
            </section>

            <section className='contacto' id="contacto">
                <div class="contacto__title">
                    <span>
                        <FontAwesomeIcon icon={solid('envelope')} />
                    </span>
                    <h2>CONTÁCTANOS</h2>
                </div>
                <div class="contacto__address">
                    <p>El Rosario Sinaloa</p>
                    <p id="contacto-address__calle">{contactAddress}</p>
                    <p id="contacto__horario">Horario: {contactHorario}</p>
                </div>

                <div class="contacto__socialMedia">
                    <a href={contactFacebook} id="contacto__facebook">
                        <FontAwesomeIcon icon={brands('facebook')} />
                    </a>
                    <a href={"tel:"+contactPhone} id="contacto__telefono">
                        <FontAwesomeIcon icon={solid('phone')} />
                    </a>
                    <a href={"mailto:" + contactEmail} id="contacto__correo">
                        <i class="fa-solid fa-envelope"></i>
                        <FontAwesomeIcon icon={solid('envelope')} />
                    </a>
                    <a href={"https://wa.me/" + contactWhatsapp} id="contacto__wha">
                        <FontAwesomeIcon icon={brands('whatsapp')} />
                    </a>
                </div>
                <Button text="Ir a Google Maps" onClick={() => buttonClickExternal('https://goo.gl/maps/YAsM3cSQG1G6o6Eb8')}/>
            </section>
        </main>
        <Footer />
    </div>
  )
}

export default Main