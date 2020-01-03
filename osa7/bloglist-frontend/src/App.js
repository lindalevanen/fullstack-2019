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
import Notification from './components/common/Notification'

import { setAppUser } from './reducers/userReducer'

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  componentProps,
  user,
  notification,
  ...rest
}) => {
  console.log(Component)
  console.log(isAuthenticated)

  const logout = () => {
    window.localStorage.removeItem('user')
    window.location.reload(true)
  }

  if(isAuthenticated) {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification notification={notification}  />

        <p>{user && user.username} logged in <button onClick={logout}>logout</button></p>
        <Component {...componentProps} {...rest} />
      </div>
    )
  } else {
    return <Redirect to='/login' />
  }
}

const privaRouteStateToProps = state => {
  return {
    notification: state.notification,
    user: state.user.appUser
  }
}

const PrivaRouteWithWrap = connect(privaRouteStateToProps, null)(PrivateRoute)

const App = ({ appUser, setAppUser }) => {
  useEffect(() => {
    console.log('yo')
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setAppUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  console.log(appUser)

  return (
    <div className="App">
      <Router>
        <div>
          <Route
            render={props => (
              <PrivaRouteWithWrap
                isAuthenticated={appUser}
                component={Blogs}
                componentProps={{ user: appUser }}
                {...props} />
            )}
            exact
            path='/'
          />
          <Route
            render={props => (
              <PrivaRouteWithWrap
                isAuthenticated={appUser}
                component={Users}
                {...props}
              />
            )}
            exact
            path='/users'
          />
          <Route
            render={props => (
              <PrivaRouteWithWrap
                isAuthenticated={appUser}
                component={User}
                componentProps={{ userId: props.match.params.id }}
                {...props}
              />
            )}
            exact
            path='/users/:id'
          />
          <Route exact path="/login" render={() =>
            <Login onUserReceived={setAppUser} appUser={appUser} />
          } />

        </div>

      </Router>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    appUser: state.user.appUser
  }
}

const mapDispatchToProps = {
  setAppUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)