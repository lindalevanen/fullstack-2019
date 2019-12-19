
const initialState = {
  message: null,
  success: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        message: action.data.message,
        success: action.data.success
      }
    case 'HIDE_NOTIFICATION':
      return initialState
    default: return state
  }
}

const showNotification = (message, success) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: {
      message,
      success
    }
  }
}

const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export const setNotification = (message, success, time) => {
  return async dispatch => {
    dispatch(showNotification(message, success))
    setTimeout(() => {
      dispatch(dispatch(hideNotification()))
    }, time * 1000)
  }
}

export default reducer