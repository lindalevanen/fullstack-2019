import React from 'react'
import { add } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ store }) => {

  const onAdd = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    store.dispatch(add(content))
    event.target.anecdote.value = ''
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

export default AnecdoteForm