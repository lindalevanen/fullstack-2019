import userService from '../services/users'
import handleError from './errorHandler'

const initialState = {
  appUser: JSON.parse(window.localStorage.getItem('user')) || null,
  allUsers: [],
  viewUser: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_APP_USER':
      return { ...state, appUser: action.data.user }
    case 'INIT_USERS':
      return { ...state, allUsers: action.data }
    case 'SET_VIEW_USER':
      return { ...state, viewUser: action.data }
    default: return state
  }
}

export const setAppUser = (user) => {
  return {
    type: 'SET_APP_USER',
    data: { user }
  }
}

export const getUser = (userId) => {
  return async dispatch => {
    try {
      const data = await userService.getUser(userId)
      dispatch({
        type: 'SET_VIEW_USER',
        data
      })
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

export const initUsers = () => {
  return async dispatch => {
    try {
      const data = await userService.getAll()
      dispatch({
        type: 'INIT_USERS',
        data
      })
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

export default reducer