import React from 'react'
import './InputCMS.css'

function InputCMS(props) {
  return (
    <textarea className='InputCMS' type="text" defaultValue={props.defaultData} onChange={props.onDataChange}/>
  )
}

export default InputCMS