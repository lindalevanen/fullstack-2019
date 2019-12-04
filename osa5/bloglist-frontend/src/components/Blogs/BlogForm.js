import React, { useState } from 'react'
import blogService from '../../services/blogs'


const BlogForm = ({
  addBlog,
  showNotification,
  onHideForm
}) => {
  const [ newBlogTitle, setNewBlogTitle ] = useState('')
  const [ newBlogAuthor, setNewBlogAuthor ] = useState('')
  const [ newBlogUrl, setNewBlogUrl ] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (newBlogTitle && newBlogAuthor && newBlogUrl) {
      createBlog({ title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl })
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
    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
  }

  const onCancelPress = () => {
    clearFields()
    onHideForm()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new</h2>

      <div>
        title: <input value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} />
        <br />
        author: <input value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} />
        <br />
        url: <input value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} />
      </div>
      <div>
        <button type="submit">create</button>
        <button type='button' onClick={onCancelPress}>cancel</button>
      </div>
    </form>
  )
}

export default BlogForm