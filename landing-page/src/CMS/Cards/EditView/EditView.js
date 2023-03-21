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
  setDoc,
  updateDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  deleteField,
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

  const [isErasable, setErasable] = useState(false)

  const fetchData = useCallback(async () => {
    const docSnapshot = await getDoc(doc(db, data?.collection, data?.document));
    setData(docSnapshot.data()[data?.field]);
    setOldData(docSnapshot.data()[data?.field]);
    setDataLoaded(true);
    if (data?.type === 'comite' || data?.type === 'servicios') {
      setErasable(true)
    }
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


    if (typeof Data === 'object') {

      const fieldName = []
      const fieldData = []

      let i = 0
        data?.order.map((key) => {
          const value = realData[key];

          fieldName.push(key)
          fieldData.push(inputValue[key])
        })

      for (let i = 0; i < fieldData.length; i++) {
        if (fieldData[i] === undefined) {
          fieldData[i] = realData[fieldName[i]]
        }
      }

      if (data?.type === 'comite') {

        const docRef = doc(db, 'aboutUs', 'aboutUs');

        const newObject = {
          nombre: fieldData[0],
          cargo: fieldData[1],
          img: fieldData[2],
          order: fieldData[3]
        };

        console.log('name', data?.name)
        setDoc(docRef, { comite: { [fieldData[1]]: newObject } }, { merge: true });
        alert('Cambios realizados con éxito')
        

      } else if (data?.type === 'servicios') {

        const docRef = doc(db, 'servicios', 'servicios');

        const newObject = {
          title: fieldData[0],
          content: fieldData[1],
          img: fieldData[2],
          order: fieldData[3]
        };

        setDoc(docRef, { servicios: { [fieldData[0]]: newObject } }, { merge: true });
        alert('Cambios realizados con éxito')
    } else {
      if (Object.keys(inputValue).length === 0) {
        alert('No se han realizado cambios')
      } else {
        let value = inputValue[data['content']]
        updateDoc(doc(db, data?.collection, data?.document), {
          [data?.field]: value
        });
        alert('Cambios realizados con éxito')
      }
    }
  }}

  function deleteE() {
    if (data?.type === 'comite') {
      const comiteRef = doc(db, 'aboutUs', 'aboutUs');
      const nestedField = `comite.${data?.name}`
      updateDoc(comiteRef, {
        [nestedField]: deleteField()
      });
      alert('Cambios realizados con éxito')
    } else if (data?.type === 'servicios') {
      const serviciosRef = doc(db, 'servicios', 'servicios');
      const nestedField = `servicios.${data?.name}`
      updateDoc(serviciosRef, {
        [nestedField]: deleteField()
      });
      alert('Cambios realizados con éxito')
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
        if (key === 'cargo' || key === 'title') {
          return null;
        }
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
        <span>
          <FontAwesomeIcon icon={solid('circle-chevron-left')} onClick={handleClick}/>
            </span>
              <h1>{data?.name}</h1>
            </div>
            {typeof Data === 'object' && mappedData }
            {typeof Data !== 'object' && (
              <InputCMS
                name = {data?.content}
                defaultData={realData}
                onDataChange={(e) => handleDataChange(realData, e.target.value)}
              />)}

            <div className='EditView_buttons'>
              {isErasable && <Button text='Borrar' onClick={deleteE} color={"#FFB4AB"} width={"130px"} margin={"0 15px"}/>}
              <Button text='Actualizar' onClick={update} width={"130px"} margin={"0 15px"}/>
            </div>
              
      </div>
  )
}
  

export default EditView