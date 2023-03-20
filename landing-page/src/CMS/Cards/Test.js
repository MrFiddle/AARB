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
import InputCMS from './EditView/InputCMS';
import Button from '../../components/Button';

function Test() {

  const [Data, setData] = useState([]);
  const [inputValue, setInputValue] = useState({});

  function handleDataChange (name, value) {

    setInputValue(prevValues => ({
      ...prevValues,
      [name]: value,
    }));

  }

  function handleClick () {
    console.log(inputValue)
  }


  return (
    <div>
        <InputCMS
          name="e1"
          defaultData="Test"
          onDataChange={(e) => handleDataChange("e1", e.target.value)}/>
        
        <InputCMS
          name="e2"
          defaultData="Test"
          onDataChange={(e) => handleDataChange("e2", e.target.value)}/>

        <InputCMS
          name="e3"
          defaultData="Test"
          onDataChange={(e) => handleDataChange("e3", e.target.value)}/>
        
        <Button text="test" onClick={handleClick}/>
    </div>
  )
}

export default Test