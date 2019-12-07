import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes
  const filter = store.getState().filter

  const onVote = (a) => {
    store.dispatch(voteAnecdote(a.id))
    store.dispatch(showNotification(`you voted ${a.content}`))
  }

  return (
    [...anecdotes]
      .sort((a,b) => b.votes - a.votes)
      .filter(a => a.content.includes(filter))
      .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => onVote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList