import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuthContext } from '../context/UserAuthContext';

function ProtectedRoute({children}) {
  let { user } = useUserAuthContext();
  if (!user) {
    return <Navigate to="/adminCMS"/>
  }
  return (
    children
  )
}

export default ProtectedRoute