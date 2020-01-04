import { setNotification } from './notificationReducer'

const handleError = (error, dispatch) => {
  console.log(error.response.data)
  if(error.response.data.error) {
    dispatch(setNotification(error.response.data.error, false, 10))
  } else {
    dispatch(setNotification('An error occurred...', false, 10))
  }
}

export default handleError