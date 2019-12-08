import React from 'react'
import { connect } from 'react-redux'

import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {

  const onAdd = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(content)
    props.setNotification(`you added ${content}`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onAdd}>
        <div><input name="anecdote" /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
