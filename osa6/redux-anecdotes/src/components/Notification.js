import React from 'react'
import { connect } from 'react-redux'

import { showNotification } from '../reducers/notificationReducer'

const Notification = props => {
  const { notification } = props

  if (notification) {
    setTimeout(() => {
      props.showNotification(null)
    }, 5000)
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    notification ?
      <div style={style}>
        {notification}
      </div>
    : <></>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  showNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)