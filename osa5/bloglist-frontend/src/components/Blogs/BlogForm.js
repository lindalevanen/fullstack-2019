import React from 'react'
import blogService from '../../services/blogs'
import { useField } from '../../hooks'


const BlogForm = ({
  addBlog,
  showNotification,
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
      const newBlog = await blogService.create(blog)
      addBlog(newBlog)
      clearFields()
    } catch(error) {
      if(error.response.data.error) {
        showNotification(error.response.data.error, false)
      } else {
        showNotification(`Creating the blog ${blog.title} failed.`, false)
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

export default BlogForm