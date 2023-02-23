import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Switch, Route, RouterProvider, Routes, Link, createBrowserRouter } from "react-router-dom";
import './index.css';


import Nav from './navBar/Nav';
import Footer from './footer/Footer';
import Main from './mainPage/Main';
import Nosotros from './Nosotros/Nosotros';
import Servicios from './Servicios/Servicios';
import Noticias from './Noticias/Noticias';

import reportWebVitals from './reportWebVitals';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import './firestore'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <div>Not found</div>,
  },
  {
    path: "/nosotros",
    element: <Nosotros />,
  },
  {
    path: "/servicios",
    element: <Servicios />,
  },
  {
    path: "/noticias",
    element: <Noticias />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
