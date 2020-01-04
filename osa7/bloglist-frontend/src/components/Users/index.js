

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { initUsers } from '../../reducers/userReducer'

const UserListView = ({ allUsers, initUsers }) => {

  useEffect(() => {
    initUsers()
  }, [initUsers])

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