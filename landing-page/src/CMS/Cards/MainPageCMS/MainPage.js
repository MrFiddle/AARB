import React, {useState, useCallback, useEffect} from 'react'
import CMS_Card from '../CMS_Card/CMS_Card'
import './MainPage.css'

import {
  collection,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';

import db from '../../../firestore';

function MainPage() {

  const [Data, setData] = useState([]);
  const [Footer, setFooter] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'mainPage'));
    const querySnapshot2 = await getDocs(collection(db, 'footer'));
    const data = querySnapshot.docs.map((doc) => doc.data());
    const data2 = querySnapshot2.docs.map((doc) => doc.data());
    setData(data);
    setFooter(data2);
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  var background_image, orgSlogan; /* Header */
  var aboutUsContent, aboutUsImage /* Nosotros */
  var contactAddress, contactHorario, contactPhone, contactEmail, contactFacebook, contactWhatsapp, contactMaps; /* Contacto */
  var serviciosContent, serviciosImage; /* Servicios */

  if (!dataLoaded) {
    return <div></div>;
  }

  return (
    <div className='MainPageCMS_Container'>
      <section className='CMS__headers'>
        <h2>HEADER</h2>

        <CMS_Card
          name="Imagen"
          content={Data[2]['background_image']}
          collection="mainPage"
          document="header"
          field="background_image"/>


        <CMS_Card
          name="Slogan"
          content={Data[2]['org_slogan']}
          collection="mainPage"
          document="header"
          field="org_slogan"/>

      </section>

      {/* Quienes Somos */}
      <section className='CMS__headers'>
        <h2>QUIENES SOMOS</h2>

        <CMS_Card
          name="Contenido"
          content={Data[0]['content']}
          collection="mainPage"
          document="aboutUs"
          field="content"/>

        <CMS_Card
          name="Imagen"
          content={Data[0]['image']}
          collection="mainPage"
          document="aboutUs"
          field="image"/>

      </section>

      {/* Contacto */}
      <section className='CMS__headers'>
        <h2>CONTACTO</h2>

        <CMS_Card
          name="Dirección"
          content={Data[1]['address']}
          collection="mainPage"
          document="contact"
          field="address"/>

        <CMS_Card
          name="Horario"
          content={Data[1]['horario']}
          collection="mainPage"
          document="contact"
          field="horario"/>
        
        <CMS_Card
          name="Teléfono"
          content={Data[1]['phone']}
          collection="mainPage"
          document="contact"
          field="phone"/>
        
        <CMS_Card
          name="Email"
          content={Data[1]['email']}
          collection="mainPage"
          document="contact"
          field="email"/>

        <CMS_Card
          name="Facebook"
          content={Data[1]['facebook']}
          collection="mainPage"
          document="contact"
          field="facebook"/>

        <CMS_Card
          name="WhatsApp"
          content={Data[1]['whatsapp']}
          collection="mainPage"
          document="contact"
          field="whatsapp"/>

        <CMS_Card
          name="Google Maps"
          content={Data[1]['maps']}
          collection="mainPage"
          document="contact"
          field="maps"/>

      </section>

      {/* Servicios */}
      <section className='CMS__headers'>
        <h2>SERVICIOS</h2>

        <CMS_Card
          name="Contenido"
          content={Data[4]['content']}
          collection="mainPage"
          document="services"
          field="content"/>
        
        <CMS_Card
          name="Imagen"
          content={Data[4]['image']}
          collection="mainPage"
          document="services"
          field="image"/>
      </section>

      {/* Footer */}
      <section className='CMS__headers'>
        <h2>FOOTER</h2>

        <CMS_Card
          name="Contenido"
          content={Footer[0]['content']}
          collection="footer"
          document="content"
          field="content"/>
      </section>

    </div>
  )
}

export default MainPage