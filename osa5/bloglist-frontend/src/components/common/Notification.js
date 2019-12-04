import React from 'react'
import '../styles.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`notification ${message.success ? 'success' : 'error'}`}>
      {message.text}
    </div>
  )
}

export default Notification