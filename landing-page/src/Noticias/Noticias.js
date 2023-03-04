import React, {useState, useEffect, useRef, useCallback} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import {
    collection,
    getDocs,
    orderBy,
} from 'firebase/firestore';
import db from '../firestore'

import Nav from '../navBar/Nav';
import { useHeaderHeight } from '../components/HeaderHeight';
import Footer from '../footer/Footer';
import Card from '../components/Card';

import './Noticias.css'

function Noticias() {
    const myDivRef = useRef(null);
    const [clientHeight, setClientHeight] = useState(null);
    const [Data, setData] = useState([]);
    const [dataLoaded , setDataLoaded] = useState(false);

    const fetchData = useCallback(async () => {
        const querySnapshot = await getDocs(collection(db, 'news'), orderBy('fecha', 'desc'));
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }, []);

    useEffect(() => {
        async function fetchDataAndSetData() {
            const data = await fetchData();
            setData(data);
            setDataLoaded(true);
        }
        fetchDataAndSetData();
    }, [fetchData]);

    useEffect(() => {
        if (myDivRef.current && dataLoaded) {
            const height = myDivRef.current.clientHeight;
            setClientHeight(height);
        }
    }, [myDivRef, dataLoaded]);

    function handleClick(newId) {
        window.location.href = '/noticias/' + newId;
    }
    var fecha;
  return (
    <div>
        <Nav headerHeight = {clientHeight}/>
        <header className='noticias_header' ref={myDivRef}>
            <span>
                <FontAwesomeIcon icon={solid('newspaper')}/>
            </span>
            <h1>Noticias</h1>
        </header>
        <div className='main_noticias'>
            <h2>ÚLTIMAS NOTICIAS</h2>
            {Data.map((item) => (
                fecha = new Date((item.fecha).seconds * 1000 + (item.fecha).nanoseconds / 1000000).toLocaleDateString('es-MX'),
                <Card title={item.titulo} date={fecha} backgroundImage = {item.img} onClick={() => handleClick(item.id)}/>
            ))}
        </div>
        <Footer />
    </div>
  )
}

export default Noticias