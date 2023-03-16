import React from 'react'
import CMS_Card from '../CMS_Card/CMS_Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import './ServiciosCMS.css'

function ServiciosCMS() {
  return (
    <div className='ServiciosCMS_Container'>
      <section className='CMS__headers'>
        <h2>HEADER</h2>
        <CMS_Card name="Imagen" content="www.image.com/mp3"/>
      </section>
      
      <section className='CMS__headers'>
        <h2 className='anadir'>
            SERVICIOS
            <span>
                <FontAwesomeIcon icon={solid('circle-plus')} />
            </span>
        </h2>

        <CMS_Card name="Deshidratadora" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas"/>
        <CMS_Card name="Terreno" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas"/>

      </section>

      <section className='CMS__headers'>
        <h2>FORMULARIO</h2>

        <CMS_Card name="Correo receptor" content="jppd0657@gmail.com"/>

      </section>
    </div>
  )
}

export default ServiciosCMS