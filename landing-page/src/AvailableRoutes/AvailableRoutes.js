import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Main from '../mainPage/Main';
import Nosotros from '../Nosotros/Nosotros';
import Servicios from '../Servicios/Servicios';
import Noticias from '../Noticias/Noticias';
import NoticiaV from '../NoticiaV/NoticiaV';
import Error404 from '../components/Error404';
import Login from '../CMS/Login';
import { UserAuthContextProvider } from '../CMS/context/UserAuthContext';

import CMS from '../CMS/CMS';
import HomeCMS from '../CMS/Cards/HomeCMS/HomeCMS';
import MainPage from '../CMS/Cards/MainPageCMS/MainPage';
import NosotrosCMS from '../CMS/Cards/NosotrosCMS/NosotrosCMS';
import ServiciosCMS from '../CMS/Cards/ServiciosCMS/ServiciosCMS';
import NoticiasCMS from '../CMS/Cards/NoticiasCMS/NoticiasCMS';
import EditView from '../CMS/Cards/EditView/EditView';
import CreateView from '../CMS/Cards/CreateView/CreateView';

function AvailableRoutes() {

  // const userToken = localStorage.getItem('userToken');
  const userToken = sessionStorage.getItem('userToken');

  if (!userToken) {
    return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="noticias" element={<Noticias />} />
        <Route path="noticias/:id" element={<NoticiaV />} />
        <Route path="login" element={<UserAuthContextProvider>
          <Login />
        </UserAuthContextProvider>}/>
        <Route path="adminCMS/*" element={
          <Navigate to="/login" />
         }/>
        <Route path="*" element={<Error404 />} />
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="noticias" element={<Noticias />} />
        <Route path="noticias/:id" element={<NoticiaV />} />
        <Route path="login" element={
          <Navigate to="/adminCMS" />
        }/>

        <Route path="adminCMS/" element={<CMS />}>
          <Route path="" element={<HomeCMS />} />
          <Route path="home" element={<MainPage />} />
          <Route path="nosotros" element={<NosotrosCMS />} />
          <Route path='servicios' element={<ServiciosCMS />}/>
          <Route path='noticias' element={<NoticiasCMS />}/>
          <Route path='editar/:coll/:doc/:field/*' element={<EditView />}/>
          <Route path='anadir/:coll/:doc/:field/*' element={<CreateView />}/>
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    )
  }
}

export default AvailableRoutes