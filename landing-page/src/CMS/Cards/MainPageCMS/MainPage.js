import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import CMS_Card from '../CMS_Card/CMS_Card'
import './MainPage.css'

import EditView from '../EditView'

function MainPage() {
  return (
    <div className='MainPageCMS_Container'>
      {/* <EditView/> */}
      {/* Header */}
      <section className='CMS__headers'>
        <h2>HEADER</h2>

        <CMS_Card name="Imagen" content="www.image.com/mp3"/>
        <CMS_Card name="Slogan" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas"/>

      </section>

      {/* Quienes Somos */}
      <section className='CMS__headers'>
        <h2>QUIENES SOMOS</h2>

        <CMS_Card name="Contenido" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas"/>
        <CMS_Card name="Imagen" content="www.image.com/mp3"/>

      </section>

      {/* Contacto */}
      <section className='CMS__headers'>
        <h2>CONTACTO</h2>

        <CMS_Card name="Dirección" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas"/>
        <CMS_Card name="Horario" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas"/>
        <CMS_Card name="Facebook" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas"/>
        <CMS_Card name="Teléfono" content="6692635066"/>
        <CMS_Card name="Email" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas"/>
        <CMS_Card name="WhatsApp" content="6692635066"/>
        <CMS_Card name="Google Maps" content="maps.google.com/1234"/>

      </section>

      {/* Servicios */}
      <section className='CMS__headers'>
        <h2>SERVICIOS</h2>

        <CMS_Card name="Imagen" content="www.image.com/mp3"/>
        <CMS_Card name="Contenido" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas"/>

      </section>

      {/* Footer */}
      <section className='CMS__headers'>
        <h2>FOOTER</h2>

        <CMS_Card name="Contenido" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas"/>

      </section>

    </div>
  )
}

export default MainPage