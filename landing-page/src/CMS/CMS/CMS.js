import React from 'react'
import { BrowserRouter, Routes, Route, Outlet,  } from "react-router-dom";

import NavCMS from './components/NavCMS/NavCMS';
import HomeCMS from './components/HomeCMS/HomeCMS';
import MainPage from './components/MainPageCMS/MainPage';
import { useUserAuthContext } from '../context/UserAuthContext';

import './CMS.css'

function CMS() {

  const {user} = useUserAuthContext();
  // console.log(user);

  return (
    <Routes>
      <Route element={<NavCMS />}>
        <Route path="/" element={<HomeCMS />}/>
        <Route path="/home" element={<MainPage />} />
      </Route>
    </Routes>
  );
}

  

export default CMS