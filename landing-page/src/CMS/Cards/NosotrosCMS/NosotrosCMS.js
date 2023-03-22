import React, {useState, useCallback, useEffect } from 'react'
import {
  collection,
  getDocs,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import db from '../../../firestore';

import CMS_Card from '../CMS_Card/CMS_Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import './NosotrosCMS.css'

function NosotrosCMS() {

  let navigate = useNavigate();

  const [Data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'aboutUs'));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
    setDataLoaded(true);
  }, []);

  const addDirectivo = (data) => {
    navigate('/adminCMS/anadir/coll/doc/field/', {state: {data}});
  }

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

  console.log('Data', Data)

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
            <FontAwesomeIcon icon={solid('circle-plus')} onClick={() => {
              addDirectivo({
                type: 'comite',
                title: 'Directivo'
              })
            }}/>
          </span>
        </h2>

          {Object.entries(sortedData).map(([key, value]) => {
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
                type="comite"
              />
            )
          })}


      </section>
    </div>
  )
}

export default NosotrosCMS