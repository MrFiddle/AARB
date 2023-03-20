import React, {useState, useCallback, useEffect, useMemo } from 'react'
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
  const [inputValue, setInputValue] = useState({});
  const [isObject, setIsObject] = useState(false);

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

  function handleDataChange(name, value) {
    if (value === undefined) {
      value = inputValue[name] || '';
    }
    setInputValue(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
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

    console.log(inputValue)

    if (typeof Data === 'object') {

      const fieldName = []
      const fieldData = []

      if (data?.type === 'comite') {
        let i = 0
        data?.order.map((key) => {
          console.log(key)
          const value = realData[key];

          fieldName.push(key)
          fieldData.push(inputValue[key])
        })

        console.log('realData:', realData)
        console.log(fieldName)
        console.log(fieldData)

        // const fieldDataObj = Object.fromEntries(
        //   fieldName
        //     .filter((_, i) => fieldData[i] !== undefined)
        //     .map((key, i) => [key, fieldData[i]])
        // );

        for (let i = 0; i < fieldData.length; i++) {
          if (fieldData[i] === undefined) {
            fieldData[i] = realData[fieldName[i]]
          }
        }

        updateDoc(doc(db, data?.collection, data?.document), {
          [data?.field]: {
            [data?.fieldTwo]: {
              [fieldName[0]]: fieldData[0],
              [fieldName[1]]: fieldData[1],
              [fieldName[2]]: fieldData[2],
              [fieldName[3]]: fieldData[3]
            }
          }
        });
      }
    } else {
      console.log(inputValue)
      updateDoc(doc(db, data?.collection, data?.document), {
        [data?.field]: inputValue
      });
    }
  }

  const mappedData = useMemo(() => {

    if (!dataLoaded) {
      return <div></div>;
    } else {
      if (typeof Data === 'object') {
        realData = Data[data?.fieldTwo]
      } else {
        realData = Data
      }
    }

    if (typeof Data === 'object') {
      return data?.order.map((key, index) => {
        const value = realData[key];
        return (
          <InputCMS
            name={key}
            defaultData={value}
            onDataChange={(e) => handleDataChange(key, e.target.value)}
            field={key}
            key={key}
          />
        );
      });
    } else {
      return null;
    }
  }, [Data, inputValue]);

  return (
    <div className='EditView_container'>
      <div className='EditView_Title'>
        <span onClick={handleClick}>
          <FontAwesomeIcon icon={solid('circle-chevron-left')} />
            </span>
              <h1>{data?.name}</h1>
            </div>
            {typeof Data === 'object' && mappedData }
            {typeof Data !== 'object' && (
              <InputCMS
                name = {realData}
                defaultData={realData}
                onDataChange={handleDataChange}
              />)}

            <Button text='Actualizar' onClick={update}/>
      </div>
  )
}
  
  

export default EditView