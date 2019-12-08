
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

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

export const addAnecdote = (data) => {
  return {
    type: 'ADD_ANECDOTE',
    data
  }
}

export const initAnecdotes = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data,
  }
}


export default reducer