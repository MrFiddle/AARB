import React, {useState} from 'react'
import './Login.css'

import { useUserAuthContext } from './context/UserAuthContext'

function Login() {

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
      window.location.reload();
    } catch (error) {
      setError('Credenciales incorrectas. Verifique su usuario y contraseña e intente nuevamente.')
    }
  };

  return (
    <div className='Login_Main'>
      <div className='Login_Container'>
        <form onSubmit={handleLogin}>
          <h1>INICIAR SESIÓN</h1>
          <input type='text' placeholder='Usuario' value={user} onChange={handleUserChange} />
          <input type='password' placeholder='Contraseña' value={password} onChange={handlePasswordChange} />
          <button type='submit' className='Login_Button'>
            <p>Entrar</p>
          </button>
          {error && <p className='Login_Error'>{error}</p>}
        </form>
      </div>
    </div>
  )  
}

export default Login