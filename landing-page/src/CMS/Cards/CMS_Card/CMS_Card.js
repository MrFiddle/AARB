import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import './CMS_Card.css'
import { collection } from 'firebase/firestore'

function CMS_Card(props) {

  let navigate = useNavigate()

  function handleClick (data) {
    navigate('/adminCMS/editar/' + props.collection + '/' + props.document + '/' + props.field, {state: {data}})
  }

  return (
    <article className='CMS_Card'>
        <p className='CMS-Card_name'>{props.name}</p>
        <p className='CMS-Card_content'>
          {props.content}
        </p>
        <span className='CMS-Card_edit' onClick={
          () => handleClick( { 
            collection: props.collection,
            document: props.document,
            field: props.field,
            name: props.name,
            content: props.content
           } )
        }>
           <FontAwesomeIcon icon={solid('edit')} />
        </span>
    </article>
  )
}

export default CMS_Card