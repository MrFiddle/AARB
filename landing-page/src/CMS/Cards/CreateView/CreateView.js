import React, {useState, useCallback, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import InputCMS from '../EditView/InputCMS'
import Button from '../../../components/Button'

import {
  collection,
  doc,
  updateDoc,
  arrayUnion,
  addDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  set,
  setDoc
  
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
    navigate(-1)
  }

  function handleAdd() {

    let alertMessage = "";
    if (data?.type == "comite") {

      alertMessage = "Miembro del comité agregado con éxito";
      const docRef = doc(db, 'aboutUs', 'aboutUs');

      const newObject = {
        nombre: inputValue.nombre,
        cargo: inputValue.cargo,
        img: inputValue.img,
        order: inputValue.order,
      };

      console.log(newObject)

      // use setDoc to add a new object to the 'comite' map
      setDoc(docRef, { comite: { [inputValue.cargo]: newObject } }, { merge: true });

    } else if (data?.type == 'servicios') {
      alertMessage = "Servicio agregado con éxito";
      const docRef = doc(db, 'servicios', 'servicios');

      const newObject = {
        title: inputValue.title,
        content: inputValue.content,
        img: inputValue.img,
        order: inputValue.order,
      };

      // use setDoc to add a new object to the 'comite' map
      setDoc(docRef, { servicios: { [inputValue.title]: newObject } }, { merge: true });
    }
    alertMessage && alert(alertMessage);
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