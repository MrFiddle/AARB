import React, {useState, useCallback, useEffect} from 'react'
import {
    collection,
    doc,
    updateDoc,
    getDocs,
    getDoc,
    query,
    orderBy,
    set
    
  } from 'firebase/firestore';
  
import db from '../../firestore';

function Test() {

  const [Data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const docSnapshot = await getDoc(doc(db, 'aboutUs', 'aboutUs'));
    setData(docSnapshot.data()['comite']);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sortedData = Object.entries(Data)
  .sort(([, a], [, b]) => a.order - b.order)
  .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});

  console.log(sortedData);

  return (
    <div>
        <h1>TEST</h1>
        {Object.entries(sortedData).map(([key, value]) => {
            return (
                <div key={key}>
                    <h2>{value.cargo}</h2>
                    <h3>{value.nombre}</h3>
                    <h3>{value.order}</h3>
                </div>
            )
        })
        }
    </div>
  )
}

export default Test