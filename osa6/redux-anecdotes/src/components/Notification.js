import React from 'react'
import { showNotification } from '../reducers/notificationReducer'

const Notification = ({store}) => {
  const { notification } = store.getState()

  if (notification) {
    setTimeout(() => {
      store.dispatch(showNotification(null))
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

export default Notification