
const initialState = ''

const reducer = (state = initialState, action) => {  
  switch (action.type) {
    case 'SHOW_NOTIFICATION':

      return action.data.notification
    default: return state
  }
}

export const showNotification = (notification) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { notification }
  }
}

export default reducer