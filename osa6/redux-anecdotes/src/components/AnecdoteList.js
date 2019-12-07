import React from 'react'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState()

  const onVote = (id) => {
    store.dispatch(vote(id))
  }

  return (
    [...anecdotes].sort((a,b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => onVote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList