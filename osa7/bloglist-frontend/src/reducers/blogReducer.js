import blogService from '../services/blogs'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIKE_BLOG':
      return (
        state.map(b => b.id === action.data.id
          ? { ...b, likes: b.votes + 1 }
          : b
        )
      )
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'SET_BLOGS':
      return action.data.blogs
    default: return state
  }
}

export const likeBlog = (id, newLikes) => {
  return async dispatch => {
    const data = await blogService.update(id, newLikes)
    dispatch({
      type: 'LIKE_BLOG',
      data: { id: data.id }
    })
  }
}

export const addBlog = content => {
  return async dispatch => {
    const data = await blogService.create(content)
    dispatch({
      type: 'ADD_BLOG',
      data
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const setBlogs = (blogs) => {
  return async dispatch => {
    dispatch({
      type: 'SET_BLOGS',
      data: { blogs }
    })
  }
}

export default reducer