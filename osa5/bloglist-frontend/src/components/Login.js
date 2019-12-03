import React, { useState } from 'react';
import loginService from '../services/login' 
import blogService from '../services/blogs'
import Notification from './Notification'

const Login = ({ onUserReceived }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user)) 
      onUserReceived(user)
    } catch (e) {
      if (e.response) {
        const { error } = e.response.data
        showErrorMessage(error, false)
      } else {
        showErrorMessage('An error occurred...', false)
      }
    }
  }

  const showErrorMessage = (text, success) => {
    setErrorMessage({text, success})
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <>
      <h2>log in to application</h2>
      <Notification message={errorMessage}  />

      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default Login