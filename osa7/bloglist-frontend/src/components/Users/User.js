

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getUser } from '../../reducers/userReducer'

const User = ({ user, getUser, setNotification }) => {

  useEffect(() => {
    const init = async () => {
      try {
        !user && getUser()
      } catch(error) {
        console.log(error.response.data)
        if(error.response.data.error) {
          setNotification(error.response.data.error, false, 10)
        } else {
          setNotification('An error occurred...', false, 10)
        }
      }
    }
    init()
  }, [])


  return (
    <div className='blogs-wrapper'>
      {user && (
      <>
        <h1>{user.username}</h1>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.map(b => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      </>
      )}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const existingUser = state.user.allUsers.find(u => u.id === ownProps.userId)
  return {
    user: existingUser || state.user.viewUser
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return ({
    getUser: () => dispatch(getUser(props.userId))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(User)