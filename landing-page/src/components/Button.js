import React from 'react'
import './Button.css'

function Button(props) {
  const handleClick = (event) => {
    event.preventDefault();
    window.location.href = props.url;
  };
  return (
    <div style={{width: props.width}} href={props.url} onClick={handleClick} className='button'>
        <p>{props.text}</p>
    </div>
  )
}

export default Button
