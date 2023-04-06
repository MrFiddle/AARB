import React from 'react'
import './Button.css'

function Button(props) {
  return (
    <div style={{width: props.width, backgroundColor: props.color, margin: props.margin}} className='button' onClick={props.onClick}>
        <p>{props.text}</p>
    </div>
  )
}

export default Button
