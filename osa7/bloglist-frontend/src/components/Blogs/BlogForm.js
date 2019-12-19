import React from 'react'
import { connect } from 'react-redux'

import { addBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { useField } from '../../hooks'


const BlogForm = ({
  addBlog,
  setNotification,
  onHideForm
}) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmit = e => {
    e.preventDefault()
    if (title.value && author.value && url.value) {
      createBlog({ title: title.value, author: author.value, url: url.value })
    }
  }

  const createBlog = async blog => {
    try {
      addBlog(blog)
      setNotification(`A new blog ${blog.title} by ${blog.author} added`, true, 10)
      clearFields()
    } catch(error) {
      if(error.response.data.error) {
        setNotification(error.response.data.error, false, 10)
      } else {
        setNotification(`Creating the blog ${blog.title} failed.`, false, 10)
      }
    }
  }

  const clearFields = () => {
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <form onSubmit={handleSubmit} onReset={onHideForm}>
      <h2>Create new</h2>

      <div>
        title: <input {...title.fieldProps} />
        <br />
        author: <input {...author.fieldProps} />
        <br />
        url: <input {...url.fieldProps} />
      </div>
      <div>
        <button type='submit'>create</button>
        <button type='reset'>cancel</button>
      </div>
    </form>
  )
}

const mapDispatchToProps = {
  addBlog,
  setNotification
}

export default connect(null, mapDispatchToProps)(BlogForm)
