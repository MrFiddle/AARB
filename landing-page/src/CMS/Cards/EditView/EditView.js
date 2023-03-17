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
  const [OldData, setOldData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchData = useCallback(async () => {
    const docSnapshot = await getDoc(doc(db, data?.collection, data?.document));
    setData(docSnapshot.data()[data?.field]);
    setOldData(docSnapshot.data()[data?.field]);
  }, []);
  

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // console.log(data?.collection)
  // console.log(data?.document)
  // console.log(data?.field)
  // console.log(Data)

  function handleClick () {
    {/* function to go to the previous route */}
    navigate(-1)
  }

  function handleDataChange (e) {
    {/* function to update the data */}
    setInputValue(e.target.value)
  }

  function update() {
    // const docRef = doc(db, data?.collection, data?.document);
    // console.log('DocRef:', docRef); // Add this line to log the value of docRef
    // console.log('data?.field:', data?.field); // Add this line to log the value of data?.field
    // console.log('Data:', Data); // Add this line to log the value of Data
    // docRef.update({
    //   [data?.field]: Data
    // });
    updateDoc(doc(db, data?.collection, data?.document), {
      [data?.field]: inputValue
    });
  }
  

  return (
    <div className='EditView_container'>
        <div className='EditView_Title'>
            <span onClick={handleClick}>
                <FontAwesomeIcon icon={solid('circle-chevron-left')} />
            </span>
            <h1>{data?.name}</h1>
        </div>
        {/* Will render depending on the props given */}
        <InputCMS defaultData={Data} onDataChange={handleDataChange}/>
        <Button text='Actualizar' onClick={update}/>
    </div>
  )
}

export default EditView