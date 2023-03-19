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

  let realData;

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
    console.log('OldData:', OldData)
    console.log('NewData:', inputValue)
    if (OldData === inputValue || inputValue === '') {
      alert('No se han realizado cambios')
      return
    } else {
      alert('Se han realizado cambios')
      updateDoc(doc(db, data?.collection, data?.document), {
        [data?.field]: inputValue
      });
      setOldData(inputValue)
    }
  }

  if (!dataLoaded) {
    return <div></div>;
  } else {
    if (typeof Data === 'object') {
      realData = Data[data?.fieldTwo]
    } else {
      realData = Data
    }
  }

  return (
    <div className='EditView_container'>
      <div className='EditView_Title'>
        <span onClick={handleClick}>
          <FontAwesomeIcon icon={solid('circle-chevron-left')} />
            </span>
              <h1>{data?.name}</h1>
            </div>
            {data?.order.map((key) => {
              const value = realData[key];
              return (
                <InputCMS
                  defaultData={value}
                  onDataChange={handleDataChange}
                  field={key}
                  key={key}
                />
              );
            })}

            <Button text='Actualizar' onClick={update}/>
      </div>
  )
}
  
  

export default EditView