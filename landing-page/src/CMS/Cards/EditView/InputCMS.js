import React from 'react'
import './InputCMS.css'

function InputCMS(props) {
  return (
    <div className='InputCMS'>
      <h1>{props.field}</h1>
      <textarea className='InputCMS' type="text" defaultValue={props.defaultData} onChange={props.onDataChange}/>
    </div>
  )
}

export default InputCMS