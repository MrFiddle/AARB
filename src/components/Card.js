import React from 'react'
import './Card.css'

function Card(props) {
  return (
    <div className='card' style={{backgroundImage: `url(${props.backgroundImage})`}}>
        <div className='card__text'>
            <h3>{props.title}</h3>
            <p>{props.date}</p>
        </div>
    </div>
  )
}

export default Card