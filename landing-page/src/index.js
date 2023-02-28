import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css';

import Main from './mainPage/Main';
import Nosotros from './Nosotros/Nosotros';
import Servicios from './Servicios/Servicios';
import Noticias from './Noticias/Noticias';
import NoticiaV from './NoticiaV/NoticiaV';
import Error404 from './components/Error404';

import reportWebVitals from './reportWebVitals';
import './firestore'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error404/>
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
  },
  {
    path: "/noticias/:id",
    element: <NoticiaV />,
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
