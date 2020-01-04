import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import loginService from '../../services/login'
import blogService from '../../services/blogs'
import Notification from '../common/Notification'

import { useField } from '../../hooks'
import { setNotification } from '../../reducers/notificationReducer'

const Login = ({ onUserReceived, appUser, notification, setNotification }) => {
  const username = useField('text')
  const password = useField('password')

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
        setNotification(error, false, 5)
      } else {
        setNotification('An error occurred...', false, 5)
      }
    }
  }

  if(appUser) {
    return <Redirect to='/' />
  }

  return (
    <div className='main-content'>
      <h2>log in to application</h2>
      <Notification notification={notification}  />

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
    </div>
  )
}


const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)