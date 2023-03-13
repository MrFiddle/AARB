import React from 'react'
import { useUserAuthContext } from '../CMS/context/UserAuthContext'
import { Routes, Route, Navigate } from 'react-router-dom'

import Main from '../mainPage/Main';
import Nosotros from '../Nosotros/Nosotros';
import Servicios from '../Servicios/Servicios';
import Noticias from '../Noticias/Noticias';
import NoticiaV from '../NoticiaV/NoticiaV';
import Error404 from '../components/Error404';
import Login from '../CMS/Login';
import { UserAuthContextProvider } from '../CMS/context/UserAuthContext';

import NavCMS from '../CMS/CMS/components/NavCMS/NavCMS';
import HomeCMS from '../CMS/CMS/components/HomeCMS/HomeCMS';
import MainPage from '../CMS/CMS/components/MainPageCMS/MainPage';

function AvailableRoutes() {

  const userToken = localStorage.getItem('userToken');

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

        <Route path="adminCMS/" element={<NavCMS />}>
          <Route path="" element={<HomeCMS />} />
          <Route path="home" element={<MainPage />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    )
  }
}

export default AvailableRoutes