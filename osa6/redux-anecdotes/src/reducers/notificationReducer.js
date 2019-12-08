
const initialState = ''

const reducer = (state = initialState, action) => {  
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.notification
    default: return state
  }
}

const showNotification = (notification) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { notification }
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(dispatch(showNotification(null)))
    }, time * 1000)
  }
}

export default reducer