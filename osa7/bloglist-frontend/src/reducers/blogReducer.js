import blogService from '../services/blogs'
import handleError from './errorHandler'
import { setNotification } from './notificationReducer'

const initialState = {
  all: [],
  details: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIKE_BLOG':
      return {
        ...state,
        details: { ...state.details, likes: state.details.likes + 1 }
      }
    case 'REMOVE_BLOG':
      return {
        ...state,
        all: state.all.filter(b => b.id !== action.data.id)
      }
    case 'INIT_BLOGS':
      return { ...state, all: action.data }
    case 'SET_VIEW_BLOG':
      return { ...state, details: action.data }
    case 'ADD_BLOG':
      return { ...state, all: state.all.concat(action.data) }
    case 'ADD_COMMENT':
      return {
        ...state,
        details: {
          ...state.details,
          comments: state.details.comments.concat(action.data.comment)
        }
      }
    case 'CLEAR_BLOG':
      return { ...state, details: null }
    default: return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    try {
      const data = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data
      })
    } catch(error) {
      handleError(error, dispatch)
    }
  }
}

export const getBlog = id => {
  return async dispatch => {
    try {
      const data = await blogService.getBlog(id)
      dispatch({
        type: 'SET_VIEW_BLOG',
        data
      })
    } catch(error) {
      handleError(error, dispatch)
    }
  }
}

export const likeBlog = (id, newLikes) => {
  return async dispatch => {
    try {
      const data = await blogService.update(id, newLikes)
      dispatch({
        type: 'LIKE_BLOG',
        data: { newLikes: data.likes }
      })
    } catch(error) {
      handleError(error, dispatch)
    }
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: { id: blog.id }
      })
      dispatch(setNotification(`Deleted ${blog.title} by ${blog.author}`, true, 10))

    } catch(error) {
      handleError(error, dispatch)
    }
  }
}

export const addBlog = blog => {
  return async dispatch => {
    try {
      const data = await blogService.create(blog)
      dispatch({
        type: 'ADD_BLOG',
        data
      })
      dispatch(setNotification(`A new blog ${blog.title} by ${blog.author} added`, true, 10))
    } catch(error) {
      handleError(error, dispatch)
    }
  }
}

export const commentBlog = (blogId, comment) => {
  return async dispatch => {
    try {
      await blogService.comment(blogId, comment)
      dispatch({
        type: 'ADD_COMMENT',
        data: { comment }
      })
    } catch(error) {
      handleError(error, dispatch)
    }
  }

}

export const clearBlog = () => {
  return {
    type: 'CLEAR_BLOG'
  }
}

export default reducer