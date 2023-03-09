import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import Main from './mainPage/Main';
import Nosotros from './Nosotros/Nosotros';
import Servicios from './Servicios/Servicios';
import Noticias from './Noticias/Noticias';
import NoticiaV from './NoticiaV/NoticiaV';
import Error404 from './components/Error404';

import Login from './CMS/Login';
import HomeCMS from './CMS/HomeCMS/HomeCMS';

import reportWebVitals from './reportWebVitals';
import './firestore'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router}/> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="noticias" element={<Noticias />} />
        <Route path="noticias/:id" element={<NoticiaV />} />
        <Route path="adminCMS" element={<Login />}/>
        <Route path="adminCMS/home" element={<HomeCMS />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
