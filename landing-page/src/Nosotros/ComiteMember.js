import React from 'react'
import './ComiteMember.css'

function ComiteMember(props) {
  let img;

  if (props.img) {
    img = props.img;
  {/* check if the URL is a valid one */}
  } else if (props.img == '') {
    img = 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
  } else {
    img = 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
  }

  if (!props.img || props.img == '') {
    img = 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
  } else {
    img = props.img;
  }

  return (
    <div className='comiteCard'>
        <img src={img}/>
        <h2>{props.nombre}</h2>
        <p>{props.cargo}</p>
    </div>
  )
}

export default ComiteMember
