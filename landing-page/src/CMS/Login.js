import React, {useState} from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import './Login.css'

import auth from '../firebaseAuth'
import { useUserAuthContext } from './context/UserAuthContext'
import { async } from '@firebase/util'

function Login() {

  const navigate = useNavigate()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const {logIn} = useUserAuthContext()

  function handleUserChange(e) {
    setUser(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

 const handleLogin = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await logIn(user, password);
      navigate('/adminCMS/home')
    } catch (error) {
      setError("Usuario o contraseña incorrectos")
    }
  };

  return (
    <div className='Login_Main'>
        <div className='Login_Container'>
            <h1>INICIAR SESIÓN</h1>
            <input type='text' placeholder='Usuario' value={user} onChange={handleUserChange} />
            <input type='password' placeholder='Contraseña' value={password} onChange={handlePasswordChange} />
            <div className='Login_Button' onClick={handleLogin}>
              <p>Entrar</p>
            </div>
            {error && <p className='Login_Error'>{error}</p>}
        </div>
    </div>
  )
}

export default Login