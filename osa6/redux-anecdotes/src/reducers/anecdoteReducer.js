import anecdoteService from '../services/anecdotes'

const initialState = []

const reducer = (state = initialState, action) => {  
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      return (
        state.map(a => a.id === action.data.id
            ? { ...a, votes: a.votes + 1 }
            : a
        )
      )
    case 'INIT_ANECDOTES':
      return action.data
    case 'ADD_ANECDOTE':
      return state.concat(action.data)
    default: return state
  }
}

export const voteAnecdote = (id, newVotes) => {
  return async dispatch => {
    const data = await anecdoteService.update(id, newVotes)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: { id: data.id }
    })
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data
    })
  }
}


export const initAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data,
    })
  }
}

export default reducer