import React from 'react'
import { Router, Link } from 'react-router-dom'
import Nav from '../navBar/Nav'
import './Error404.css'

function Error404() {
  return (
    <div>
        <Nav />
        <div className='notFound'>
          <div className='notFound-text'>
            <h1>Página no encontrada!</h1>
            <h2>404</h2>
            <Link className='notFoundRedirect' to='/'>Regresar al inicio</Link>
            {/* <p>Favor de verificar la URL</p> */}
          </div>
        </div>
      </div>
  )
}

export default Error404