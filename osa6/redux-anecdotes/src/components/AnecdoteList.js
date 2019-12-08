import React from 'react'
import { connect } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const { anecdotes } = props

  const onVote = (a) => {
    props.voteAnecdote(a.id)
    props.showNotification(`you voted ${a.content}`)
  }

  return (
    anecdotes.map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  return [...anecdotes]
    .sort((a,b) => b.votes - a.votes)
    .filter(a => a.content.includes(filter))
}

const mapStateToProps = state => {
  return {
    anecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  showNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)