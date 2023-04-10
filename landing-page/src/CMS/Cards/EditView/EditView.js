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
  deleteField,
  deleteDoc
  
} from 'firebase/firestore';

import db from '../../../firestore';

function EditView(props) {

  let navigate = useNavigate();
  const location = useLocation();
  var data = location.state?.data;

  const [Data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [OldData, setOldData] = useState('');
  const [inputValue, setInputValue] = useState({});

  const [isErasable, setErasable] = useState(false)

  const fetchData = useCallback(async () => {

    if (data?.type === 'noticia') {
      // get docs of collection called news
      const querySnapshot = await getDocs(collection(db, 'news'));
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(docs);
      setDataLoaded(true);
    } else {
      const docSnapshot = await getDoc(doc(db, data?.collection, data?.document));
      setData(docSnapshot.data()[data?.field]);
      setOldData(docSnapshot.data()[data?.field]);
      setDataLoaded(true);
    }

    if (data?.type === 'comite' || data?.type === 'servicios' || data?.type === 'noticia') {
      setErasable(true)
    }
  }, []);

  let realData;

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  function handleClick () {
    {/* function to go to the previous route */}
    navigate(data?.route)
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

    function isValidUrl(url) {
      if (url === '') {
        return url;
      }
      const pattern = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
      return pattern.test(url);
    }

    function getDriveImageUrl(url) {
      const fileIdMatch = url.match(/\/file\/d\/(.+?)\//);
      if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/uc?id=${fileId}`;
      } else {
        return url;
      }
    }

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

        if (isValidUrl(fieldData[2]) === false) {
          alert('La url de la imagen no es válida')
          return
        }

        const newObject = {
          nombre: fieldData[0],
          cargo: fieldData[1],
          img: getDriveImageUrl(fieldData[2]),
          order: fieldData[3]
        };

        setDoc(docRef, { comite: { [data?.fieldTwo]: newObject } }, { merge: true });
        alert('Cambios realizados con éxito')
        

      } else if (data?.type === 'servicios') {

        const docRef = doc(db, 'servicios', 'servicios');

        if (isValidUrl(fieldData[2]) === false) {
          alert('La url de la imagen no es válida')
          return
        }

        const newObject = {
          title: fieldData[0],
          content: fieldData[1],
          img: getDriveImageUrl(fieldData[2]),
          order: fieldData[3]
        };

        setDoc(docRef, { servicios: { [data?.fieldTwo]: newObject } }, { merge: true });
        alert('Cambios realizados con éxito')
      } else if (data?.type === 'noticia') {
        
        const docRef = doc(db, 'news', data?.document);
        if (isValidUrl(fieldData[4]) === false) {
          alert('La url de la imagen no es válida')
          return
        }

        const newObject = {
          titulo: fieldData[0],
          autor: fieldData[1],
          contenido: fieldData[2],
          img: getDriveImageUrl(fieldData[4]),
        };


        // updateDoc(docRef, { newObject }, { merge: true });
        setDoc(docRef, newObject, { merge: true });
        alert('Cambios realizados con éxito')

      } else {
      if (Object.keys(inputValue).length === 0) {
        alert('No se han realizado cambios')
      } else {
        let value = getDriveImageUrl(inputValue[data['content']])
        updateDoc(doc(db, data?.collection, data?.document), {
          [data?.field]: value
        });
        alert('Cambios realizados con éxito')
        }
      }
    } else {
      if (Object.keys(inputValue).length === 0) {
        alert('No se han realizado cambios')
      } else {
        let value = getDriveImageUrl(inputValue[data['content']])
        updateDoc(doc(db, data?.collection, data?.document), {
          [data?.field]: value
        });
        alert('Cambios realizados con éxito')
      }
    }
    // go back to the previous route
    handleClick()
  }

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
      const nestedField = `servicios.${data?.fieldTwo}`
      updateDoc(serviciosRef, {
        [nestedField]: deleteField()
      });
      alert('Cambios realizados con éxito')
    } else if (data?.type === 'noticia') {
      const newsRef = doc(db, 'news', data?.document);
      deleteDoc(newsRef);
      alert('Cambios realizados con éxito')
    }
    handleClick()
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
        if (key === 'cargo' || key === 'title' || key === 'fecha') {
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