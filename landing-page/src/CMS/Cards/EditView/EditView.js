import React, {useState, useCallback, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import InputCMS from './InputCMS'
import Button from '../../../components/Button'
import './EditView.css'

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

import db from '../../../firestore';

function EditView(props) {

  let navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;

  const [Data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [OldData, setOldData] = useState('');
  const [inputValue, setInputValue] = useState('');

  const fetchData = useCallback(async () => {
    const docSnapshot = await getDoc(doc(db, data?.collection, data?.document));
    setData(docSnapshot.data()[data?.field]);
    setOldData(docSnapshot.data()[data?.field]);
    setDataLoaded(true);
  }, []);
  
  // console.log('Data:', Data)
  console.log(data?.fieldTwo)

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleClick () {
    {/* function to go to the previous route */}
    navigate(-1)
  }

  function handleDataChange (e) {
    {/* function to update the data */}
    setInputValue(e.target.value)
  }

  function update() {
    // console.log('OldData:', OldData)
    // console.log('NewData:', inputValue)
    // if (OldData === inputValue || inputValue === '') {
    //   alert('No se han realizado cambios')
    //   return
    // } else {
    //   alert('Se han realizado cambios')
    //   updateDoc(doc(db, data?.collection, data?.document), {
    //     [data?.field]: inputValue
    //   });
    //   setOldData(inputValue)
    // }

    if (typeof Data === 'object') {
      console.log('Object')
      for (let key in Data) {
          updateDoc(doc(db, data?.collection, data?.document), {
            [data?.field]: {
              ...Data,
              [key]: inputValue
            }
          });
          setOldData(inputValue)
      }
    }
  }

  if (!dataLoaded) {
    return <div></div>;
  } else {
    if (typeof Data === 'object') {
      // alert('Object')
      let item = Data[data?.fieldTwo]
  
      return (
        <div className='EditView_container'>
            <div className='EditView_Title'>
                <span onClick={handleClick}>
                    <FontAwesomeIcon icon={solid('circle-chevron-left')} />
                </span>
                <h1>{data?.name}</h1>
            </div>
            {/* Will render depending on the props given */}
            {Object.keys(item).map((key, index) => {
              return (
                <InputCMS key={index} defaultData={item[key]} onDataChange={handleDataChange}/>
              )
  
            })}
            <Button text='Actualizar' onClick={update}/>
        </div>
      )
    } else {
  
      return (
        <div className='EditView_container'>
            <div className='EditView_Title'>
                <span onClick={handleClick}>
                    <FontAwesomeIcon icon={solid('circle-chevron-left')} />
                </span>
                <h1>{data?.name}</h1>
            </div>
            {/* Will render depending on the props given */}
  
            {/* check if Data is an object with an if clause */}
            <InputCMS defaultData={Data} onDataChange={handleDataChange}/>
            <Button text='Actualizar' onClick={update}/>
        </div>
      )
    }
  }
  
}

export default EditView