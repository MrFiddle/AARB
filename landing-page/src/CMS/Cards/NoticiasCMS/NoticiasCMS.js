import React, {useState, useCallback, useEffect } from 'react'
import {
  collection,
  getDocs,
  orderBy
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import db from '../../../firestore';

import CMS_Card from '../CMS_Card/CMS_Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import './NoticiasCMS.css'

function NoticiasCMS() {

  let navigate = useNavigate();

  let [Data, setData] = useState([]);
  let [dataLoaded, setDataLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'news'), orderBy('fecha', 'desc'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }, []);

  console.log(Data);

  useEffect(() => {
    async function fetchDataAndSetData() {
      const data = await fetchData();
      setData(data);
      setDataLoaded(true);
    }
    fetchDataAndSetData();
  }, [fetchData]);

  function handleAdd(data) {
    navigate('/adminCMS/anadir/coll/doc/field/', {state: {data}});
  }

  if (!dataLoaded) {
    return <div></div>
  }

  return (
    <div className='NoticiasCMS_Container'>

      <section className='CMS__headers'>
        <h2 className='anadir'>
            NOTICIAS
            <span>
                <FontAwesomeIcon icon={solid('circle-plus')} onClick={() => {
                  handleAdd({
                    type: 'noticia',
                    title: 'Noticia'
                  })
                }}/>
            </span>
        </h2>

        {Data.map((item, key) => {
          return (
            <CMS_Card
              key={item.id}
              name={item.titulo}
              content={item.contenido}
              collection="news"
              document={item.id}
              field="descripcion"
              fieldTwo={key}
              type="noticia"
              order={[
                'titulo',
                'autor',
                'contenido',
                'fecha',
                'img',
              ]}
            />
          )
        })}

      </section>
    </div>
  )
}

export default NoticiasCMS