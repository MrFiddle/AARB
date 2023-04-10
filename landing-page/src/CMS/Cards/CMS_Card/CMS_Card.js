import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import './CMS_Card.css'

function CMS_Card(props) {

  let navigate = useNavigate()

  function handleClick (data) {
    if (props.fieldTwo) {
      navigate('/adminCMS/editar/' + props.collection + '/' + props.document + '/' + props.field + '/' + props.fieldTwo, {state: {data}})
    } else {
      navigate('/adminCMS/editar/' + props.collection + '/' + props.document + '/' + props.field, {state: {data}})
    }
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
            fieldTwo: props.fieldTwo,
            name: props.name,
            content: props.content,
            order: props.order,
            type: props.type,
            route: props.route
           } )
        }>
           <FontAwesomeIcon icon={solid('edit')} />
        </span>
    </article>
  )
}

export default CMS_Card