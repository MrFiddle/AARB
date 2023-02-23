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
import Card from '../components/Card';

import './Noticias.css'

function Noticias() {
  return (
    <div>
        <Nav />
        <header className='noticias_header'>
            <span>
                <FontAwesomeIcon icon={solid('newspaper')} />
            </span>
            <h1>Noticias</h1>
        </header>
        <div className='main_noticias'>
            <h2>ÚLTIMAS NOTICIAS</h2>
            <Card title='Animal Crossing rifa' date='21-02-2023' backgroundImage = "https://m.media-amazon.com/images/I/81WmWhMqTbL._AC_UF1000,1000_QL80_.jpg"/>
        </div>
        <Footer />
    </div>
  )
}

export default Noticias