import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import {
    doc,
    onSnapshot,
    updateDoc,
    setDoc,
    deleteDoc,
    collection,
    serverTimestamp,
    getDocs,
    query,
    where,
    orderBy,
    enableIndexedDbPersistence,
    limit,
} from 'firebase/firestore';
import db from '../firestore'

import Nav from '../navBar/Nav';
import Footer from '../footer/Footer';
import './Servicios.css'

function Servicios() {
  return (
    <div>
      <Nav />
      <header className='servicios_header'>
        <span>
            <FontAwesomeIcon icon={solid('people-group')} />
        </span>
        <h1>Nuestros servicios</h1>
      </header>
      <div className='servicios_main'>
            {/* We are creating this with JS, these are only for debugging reasons */}
            <section class="service__container">
                
                <section class="service">
                    <h1>Deshidratadora</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, excepturi consequatur suscipit aliquam tempora eaque nesciunt fuga blanditiis eligendi laboriosam magni ratione modi cumque nisi. Porro ipsam quae perferendis quo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis explicabo enim expedita nisi amet? Dolorum ratione quasi cumque neque? Voluptatum accusamus nisi voluptas eos blanditiis. Placeat tenetur doloremque quia alias.</p>
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Centrum_Eindhoven.jpg/640px-Centrum_Eindhoven.jpg"} alt=""/>
                </section>
            </section>
            <form class="servicios_form" action="https://formsubmit.co/jppd0657@gmail.com" method="post">
                <h2>¿Interesado en algún servicio?</h2>
                <input type="text" name="Nombre" id="" placeholder="Nombre" class="servicios_form__box"></input>
                <select name="" id="" class="servicios_form__select">
                    <option value="Deshidratadora">Deshidratadora</option>
                    <option value="Deshidratadora">Deshidratadora</option>
                    <option value="Deshidratadora">Deshidratadora</option>
                </select>
                <input type="email" name="email" id="" placeholder="Correo electrónico" class="servicios_form__box"></input>
                <input type="text" name="telefono" id="" placeholder="Teléfono" class="servicios_form__box"></input>
                <textarea name="details" id="" cols="30" rows="10" class="servicios_form__textArea" placeholder="Detalles"></textarea>
                <button class="servicios_form__button button">
                    <p>Enviar</p>
                </button>
            </form>

    </div>
    </div>
  )
}

export default Servicios