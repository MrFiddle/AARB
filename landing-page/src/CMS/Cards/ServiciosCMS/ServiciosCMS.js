import React, {useState, useCallback, useEffect } from 'react'
import {
  collection,
  getDocs
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import db from '../../../firestore';
import CMS_Card from '../CMS_Card/CMS_Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import './ServiciosCMS.css'

function ServiciosCMS() {

  localStorage.setItem('currentRoute', 'ServiciosCMS')
  let navigate = useNavigate();
  let route = "/adminCMS/servicios"

  const [Data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'servicios'));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addServicio = (data) => {
    navigate('/adminCMS/anadir/coll/doc/field/', {state: {data}});
  }

  let sortedData;

  if (!dataLoaded) {
    return <div></div>;
  } else {
    sortedData = Object.entries(Data[0].servicios)
  .sort(([, a], [, b]) => a.order - b.order)
  .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
  }

  return (
    <div className='ServiciosCMS_Container'>
      <section className='CMS__headers'>
        <h2>ENCABEZADO</h2>
        <CMS_Card
          name="Imagen"
          content={Data[0]['bg_img']}
          collection="servicios"
          document="servicios"
          field="bg_img"
          route={route}
        />
      </section>
      
      <section className='CMS__headers'>
        <h2 className='anadir'>
            SERVICIOS
            <span>
                <FontAwesomeIcon icon={solid('circle-plus')} onClick={() => addServicio({
                  type: 'servicios',
                  title: 'Servicios',
                  route: route
                })}/>
            </span>
        </h2>

        {Object.entries(sortedData).map(([key, value]) => {
          return (
            <CMS_Card
              name={value.title}
              content={value.content}
              collection="servicios"
              document="servicios"
              field={'servicios'}
              fieldTwo={key}
              img={value.img}
              order={[
                'title',
                'content',
                'img',
                'order'
              ]}
              type="servicios"
              route={route}
            />
          )})
        }

      </section>

      <section className='CMS__headers'>
        <h2>FORMULARIO</h2>

        <CMS_Card
          name="Correo receptor"
          content={Data[0]['contact_email']}
          collection="servicios"
          document="servicios"
          field="contact_email"
          route={route}
          />

      </section>
    </div>
  )
}

export default ServiciosCMS