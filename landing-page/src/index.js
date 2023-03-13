import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet  } from "react-router-dom";
import './index.css';

import reportWebVitals from './reportWebVitals';
import './firestore'
import AvailableRoutes from './AvailableRoutes/AvailableRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router}/> */}
    <BrowserRouter>

      <AvailableRoutes />
      {/* <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="noticias/:id" element={<NoticiaV />} />
          <Route path="adminCMS"
          element={<Login />}>
          </Route>

          <Route path="adminCMS/panel"
            element={<ProtectedRoute>
              <CMS/>
            </ProtectedRoute>} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </UserAuthContextProvider> */}

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
