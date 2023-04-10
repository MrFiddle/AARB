import React, {useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import InputCMS from '../EditView/InputCMS'
import Button from '../../../components/Button'

import {
  collection,
  doc,
  addDoc,
  setDoc,
  serverTimestamp
  
} from 'firebase/firestore';

import db from '../../../firestore';

import './CreateView.css'

function CreateView() {

  let navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;

  const [inputValue, setInputValue] = useState({});

  useEffect(() => {
    if (data?.type == "comite") {
      setInputValue({
        nombre: '',
        cargo: '',
        img: '',
        order: '',
      })
    } else if (data?.type == "servicios") {
      setInputValue({
        title: '',
        content: '',
        img: '',
        order: '',
      })
    } else if (data?.type == "noticia") {
      setInputValue({
        title: '',
        autor: '',
        content: '',
        img: '',
      })
    }
  }, [])

  function handleDataChange(name, value) {
    setInputValue(prevValues => ({
      ...prevValues,
      [name]: value,
    }));


  }

  function handleClick () {
    {/* function to go to the previous route */}
    navigate(data?.route)
  }

  function handleAdd() {

    function isValidUrl(url) {
      if (url === ''){ return url; }
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

    let alertMessage = "";
    if (data?.type == "comite") {

      alertMessage = "Miembro del comité agregado con éxito";
      const docRef = doc(db, 'aboutUs', 'aboutUs');

      if (isValidUrl(inputValue.img) === false) {
        alert('La url de la imagen no es válida')
        return;
      }

      const newObject = {
        nombre: inputValue.nombre,
        cargo: inputValue.cargo,
        img: getDriveImageUrl(inputValue.img),
        order: inputValue.order,
      };

      // use setDoc to add a new object to the 'comite' map
      setDoc(docRef, { comite: { [inputValue.cargo]: newObject } }, { merge: true });

    } else if (data?.type == 'servicios') {
      alertMessage = "Servicio agregado con éxito";
      const docRef = doc(db, 'servicios', 'servicios');

      if (isValidUrl(inputValue.img) === false) {
        alert('La url de la imagen no es válida')
        return;
      }

      const newObject = {
        title: inputValue.title,
        content: inputValue.content,
        img: getDriveImageUrl(inputValue.img),
        order: inputValue.order,
      };

      // use setDoc to add a new object to the 'comite' map
      setDoc(docRef, { servicios: { [inputValue.title]: newObject } }, { merge: true });

    } else if (data?.type == 'noticia') {
      alertMessage = "Noticia agregada con éxito";
      const docRef = collection(db, 'news');

      if (isValidUrl(inputValue.img) === false) {
        alert('La url de la imagen no es válida')
        return;
      }

      const newObject = {
        titulo: inputValue.title,
        autor: inputValue.autor,
        contenido: inputValue.content,
        img: getDriveImageUrl(inputValue.img),
        fecha: serverTimestamp(),
      };
      // create doc with random id and add newObject as data
      addDoc(docRef, newObject);
    }
    alertMessage && alert(alertMessage);
    handleClick();
  }
  
  
  

  const mappedData = useMemo(() => {
    if (data?.type == "comite") {
      // return four inputCMS
      return (
        <div className='CreateView_boxes'>
          <InputCMS
          name="nombre"
          placeholder="Nombre"
          field="Nombre"
          key="nombre"
          onDataChange={(e) => handleDataChange("nombre", e.target.value)}/>

          <InputCMS
            name="cargo"
            defaultValue={(e) => e.value}
            placeholder="Cargo"
            field="Cargo"
            key="cargo"
            onDataChange={(e) => handleDataChange("cargo", e.target.value)}/>

          <InputCMS
            name="img"
            defaultValue={(e) => e.value}
            placeholder="Imagen"
            field="Imagen"
            key="img"
            onDataChange={(e) => handleDataChange("img", e.target.value)}/>

          <InputCMS
            name="order"
            defaultValue={(e) => e.value}
            placeholder="Orden"
            field="Orden"
            key="order"
            onDataChange={(e) => handleDataChange("order", e.target.value)}/>
        </div>
      )
    } else if (data?.type == "servicios") {
      return (
        <div className='CreateView_boxes'>
          <InputCMS
            name="title"
            defaultValue={(e) => e.value}
            placeholder="Título"
            field="Título"
            key="title"
            onDataChange={(e) => handleDataChange("title", e.target.value)}/>
          <InputCMS
            name="content"
            defaultValue={(e) => e.value}
            placeholder="Contenido"
            field="Contenido"
            key="content"
            onDataChange={(e) => handleDataChange("content", e.target.value)}/>
          <InputCMS
            name="img"
            defaultValue={(e) => e.value}
            placeholder="Imagen"
            field="Imagen"
            key="img"
            onDataChange={(e) => handleDataChange("img", e.target.value)}/>
          <InputCMS
            name="order"
            defaultValue={(e) => e.value}
            placeholder="Orden"
            field="Orden"
            key="order"
            onDataChange={(e) => handleDataChange("order", e.target.value)}/>
        </div>
      )
    } else if (data?.type == "noticia") {
      return (
        <div className='CreateView_boxes'>
          <InputCMS
            name="title"
            defaultValue={(e) => e.value}
            placeholder="Título"
            field="Título"
            key="title"
            onDataChange={(e) => handleDataChange("title", e.target.value)}/>
          <InputCMS
            name="autor"
            defaultValue={(e) => e.value}
            placeholder="Autor"
            field="Autor"
            key="autor"
            onDataChange={(e) => handleDataChange("autor", e.target.value)}/>
          <InputCMS
            name="content"
            defaultValue={(e) => e.value}
            placeholder="Contenido"
            field="Contenido"
            key="content"
            onDataChange={(e) => handleDataChange("content", e.target.value)}/>
          <InputCMS
            name="img"
            defaultValue={(e) => e.value}
            placeholder="Imagen"
            field="Imagen"
            key="img"
            onDataChange={(e) => handleDataChange("img", e.target.value)}/>
        </div>
      )
    }
  }, [data, inputValue])

  return (
    <div className='CreateView_Container'>
      <div className='CreateView_Title'>
        <span>
          <FontAwesomeIcon icon={solid('circle-chevron-left')} onClick={handleClick}/>
        </span>
        <h1>{"Añadir " + data?.title}</h1>
      </div>
      {mappedData}
      <Button text={"Añadir"} onClick={handleAdd}/>
    </div>
  )
}

export default CreateView