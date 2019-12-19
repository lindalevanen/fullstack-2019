import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom'

import blogService from './services/blogs'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/Users/User'

import { setUser, getUserList } from './reducers/userReducer'

const App = ({ user: { appUser }, setUser }) => {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [setUser])

  useEffect(() => {
    getUserList()
  })

  if(!appUser) {
    return <Redirect to='/login' />
  }

  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={() =>
          <Blogs user={appUser} />
        } />
        <Route exact path="/login" render={() =>
          <Login onUserReceived={setUser} />
        } />
        <Route exact path="/users" render={() =>
          <Users />
        } />
        <Route path="/users/:id" render={({ match }) =>
          <User userId={match.params.id} />
        } />
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setUser,
  getUserList
}

export default connect(mapStateToProps, mapDispatchToProps)(App)