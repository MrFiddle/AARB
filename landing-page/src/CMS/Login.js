import React, {useState} from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import './Login.css'

import auth from '../firebaseAuth'

function Login() {

  const history = useNavigate()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleUserChange(e) {
    setUser(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function buttonClickTest() {
    history('/noticias')
  }

 const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        history('home')
      }
      )
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        setError("Usuario o contraseña incorrectos")
      }
      );
  }

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