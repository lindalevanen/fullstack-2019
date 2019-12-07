import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import Blogs from './components/Blogs'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div className="App">
      {!user ? (
        <Login onUserReceived={setUser} />
      ) : (
        <Blogs user={user} />
      )}
    </div>
  )
}

export default App
