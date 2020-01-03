

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { initUsers } from '../../reducers/userReducer'

const UserListView = ({ setNotification, allUsers, initUsers }) => {

  useEffect(() => {
    const getUsers = async () => {
      try {
        initUsers()
      } catch(error) {
        console.log(error.response.data)
        if(error.response.data.error) {
          setNotification(error.response.data.error, false, 10)
        } else {
          setNotification('An error occurred...', false, 10)
        }
      }
    }
    getUsers()
  }, [])

  console.log(allUsers)

  return (
    <div className='users-wrapper'>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {[...allUsers].map(u => (
            <tr key={u.id}>
              <td><Link key={u.id} to={`/users/${u.id}`}>{u.username}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    allUsers: state.user.allUsers
  }
}

const mapDispatchToProps = {
  initUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListView)