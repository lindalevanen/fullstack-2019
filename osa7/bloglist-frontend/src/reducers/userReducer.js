import userService from './services/userService'

const initialState = {
  user: null,
  allUsers: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.data.user }
    case 'SET_USERLIST':
      return { ...state, allUsers: action.data }

    default: return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: { user }
  }
}

export const getUserList = () => {
  return async dispatch => {
    const data = await userService.getAll()
    dispatch({
      type: 'SET_USERLIST',
      data
    })
  }
}

export default reducer