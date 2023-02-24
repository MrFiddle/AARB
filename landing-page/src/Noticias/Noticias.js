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
    const [isNavTransparent, setIsNavTransparent] = useState(true);
    const myDivRef = useRef(null);
    const [clientHeight, setClientHeight] = useState(null);

    const [Data, setData] = useState([]);
    const [dataLoaded , setDataLoaded] = useState(false);

    const fetchData = useCallback(async () => {
        const querySnapshot = await getDocs(collection(db, 'news'), orderBy('fecha', 'desc'));
        // return querySnapshot.docs.map((doc) => doc.data());
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
        if (myDivRef.current) {
            const height = myDivRef.current.clientHeight;
            setClientHeight(height);
        }
    }, [myDivRef]);

    function handleClick(newId) {
        window.location.href = '/noticias/' + newId;
    }

    console.log(Data);
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
            {/* <Card title='Animal Crossing rifa' date='21-02-2023' backgroundImage = "https://m.media-amazon.com/images/I/81WmWhMqTbL._AC_UF1000,1000_QL80_.jpg"/> */}
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