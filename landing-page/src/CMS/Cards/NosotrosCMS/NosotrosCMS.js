import React from 'react'
import CMS_Card from '../CMS_Card/CMS_Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import './NosotrosCMS.css'

function NosotrosCMS() {
  return (
    <div className='NosotrosCMS_Container'>
    <section className='CMS__headers'>
        <h2>HEADER</h2>

        <CMS_Card name="Imagen" content="www.image.com/mp3"/>

      </section>

      {/* Quienes Somos */}
      <section className='CMS__headers'>
        <h2>CONTENIDO</h2>

        <CMS_Card name="Imagen" content="www.image.com/mp3"/>
        <CMS_Card name="Contenido" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas"/>

      </section>

      <section className='CMS__headers'>
        <h2 className='anadir'>
          COMITE DIRECTIVO
          <span>
            <FontAwesomeIcon icon={solid('circle-plus')} />
          </span>
        </h2>

        <CMS_Card name="Presidente" content="Gonzalo Vizcarra"/>

      </section>
    </div>
  )
}

export default NosotrosCMS