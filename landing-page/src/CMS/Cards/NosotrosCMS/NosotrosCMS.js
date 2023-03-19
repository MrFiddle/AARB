import React, {useState, useCallback, useEffect } from 'react'
import {
  collection,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';

import db from '../../../firestore';

import CMS_Card from '../CMS_Card/CMS_Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import './NosotrosCMS.css'

function NosotrosCMS() {

  const [Data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'aboutUs'));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let sortedData;

  if (!dataLoaded) {
    return <div></div>;
  } else {
    sortedData = Object.entries(Data[0].comite)
  .sort(([, a], [, b]) => a.order - b.order)
  .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
    console.log(sortedData)
  }

  return (
    <div className='NosotrosCMS_Container'>
    <section className='CMS__headers'>
        <h2>HEADER</h2>

        <CMS_Card
          name="Imagen"
          content={Data[0]['bg_image']}
          collection="aboutUs"
          document="aboutUs"
          field="bg_image"/>

      </section>

      {/* Quienes Somos */}
      <section className='CMS__headers'>
        <h2>CONTENIDO</h2>

        <CMS_Card
          name="Imagen"
          content={Data[0]['img1']}
          collection='aboutUs'
          document='aboutUs'
          field='img1'/>

        <CMS_Card
          name="Contenido"
          content={Data[0]['content']}
          collection='aboutUs'
          document='aboutUs'
          field='content'/>

      </section>

      <section className='CMS__headers'>
        <h2 className='anadir'>
          COMITE DIRECTIVO
          <span>
            <FontAwesomeIcon icon={solid('circle-plus')} />
          </span>
        </h2>

        {/* <CMS_Card name="Presidente" content="Gonzalo Vizcarra"/> */}
        {/* {Object.keys(sortedData).map((key) => {
          const [nombre, cargo, img] = sortedData[key];
          return (
            <CMS_Card
              name={cargo}
              content={nombre}
              collection='aboutUs'
              document='aboutUs'
              field={'comite'}
              fieldTwo={`${key}`}
              img={img}
            />
          )})} */}

          {Object.entries(sortedData).map(([key, value]) => {
            console.log(key)
            return (
              <CMS_Card
                name={value.cargo}
                content={value.nombre}
                collection='aboutUs'
                document='aboutUs'
                field={'comite'}
                fieldTwo={key}
                img={value[2]}
                order={[
                  'nombre',
                  'cargo',
                  'img',
                  'order'
                ]}
              />
            )
          })}


      </section>
    </div>
  )
}

export default NosotrosCMS