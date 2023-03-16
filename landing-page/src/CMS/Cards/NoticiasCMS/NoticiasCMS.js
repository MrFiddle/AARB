import React from 'react'
import CMS_Card from '../CMS_Card/CMS_Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import './NoticiasCMS.css'

function NoticiasCMS() {
  return (
    <div className='NoticiasCMS_Container'>
        <section className='CMS__headers'>
        <h2>HEADER</h2>
        <CMS_Card name="Imagen" content="www.image.com/mp3"/>

      </section>

      {/* Quienes Somos */}
      <section className='CMS__headers'>
        <h2 className='anadir'>
            NOTICIAS
            <span>
                <FontAwesomeIcon icon={solid('circle-plus')} />
            </span>
        </h2>

        <CMS_Card name="The Beauty of Guadalajara" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas"/>
        <CMS_Card name="Un dia en el campo" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae quod, voluptas"/>

      </section>
    </div>
  )
}

export default NoticiasCMS