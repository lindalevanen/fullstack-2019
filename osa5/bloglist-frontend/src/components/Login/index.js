import React, { useState } from 'react'
import loginService from '../../services/login'
import blogService from '../../services/blogs'
import Notification from '../common/Notification'

import { useField } from '../../hooks'

const Login = ({ onUserReceived }) => {
  const username = useField('text')
  const password = useField('password')

  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value
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
    setErrorMessage({ text, success })
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
          <input {...username.fieldProps} />
        </div>
        <div>
          password
          <input {...password.fieldProps} />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default Login