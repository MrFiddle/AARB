import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import './CMS_Card.css'

function CMS_Card(props) {
  return (
    <article className='CMS_Card'>
        <p className='CMS-Card_name'>{props.name}</p>
        <p className='CMS-Card_content'>
          {props.content}
        </p>
        <span className='CMS-Card_edit'>
           <FontAwesomeIcon icon={solid('edit')} />
        </span>
    </article>
  )
}

export default CMS_Card