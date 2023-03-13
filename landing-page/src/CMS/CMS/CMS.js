import React from 'react'
import { BrowserRouter, Routes, Route, Outlet,  } from "react-router-dom";

import NavCMS from './components/NavCMS/NavCMS';
import HomeCMS from './components/HomeCMS/HomeCMS';
import MainPage from './components/MainPageCMS/MainPage';

import './CMS.css'

function CMS() {
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