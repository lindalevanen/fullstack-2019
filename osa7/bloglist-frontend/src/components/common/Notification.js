import React from 'react'
import '../styles.css'

const Notification = ({ notification }) => {
  if (!notification.message) {
    return null
  }

  return (
    <div className={`notification ${notification.success ? 'success' : 'error'}`}>
      {notification.message}
    </div>
  )
}

export default Notification