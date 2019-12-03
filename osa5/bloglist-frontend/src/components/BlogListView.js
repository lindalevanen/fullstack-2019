

import React, {useEffect, useState} from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import Notification from './Notification'

const BlogForm = ({
  addBlog,
  showNotification
}) => {
  const [ newBlogTitle, setNewBlogTitle ] = useState('')
  const [ newBlogAuthor, setNewBlogAuthor ] = useState('')
  const [ newBlogUrl, setNewBlogUrl ] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (newBlogTitle && newBlogAuthor && newBlogUrl) {
      createBlog({title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl})
    }
  }

  const createBlog = blog => {
    blogService
      .create(blog)
      .then(newBlog => {
        addBlog(newBlog)
        clearFields()
      })
      .catch(error => {
        if(error.response.data.error) {
          showNotification(error.response.data.error, false)
        } else {
          showNotification(`Creating the blog ${blog.title} failed.`, false)
        }
      })
  }

  const clearFields = () => {
    setNewBlogAuthor('') 
    setNewBlogTitle('') 
    setNewBlogUrl('') 
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title: <input value={newBlogTitle} onChange={({target}) => setNewBlogTitle(target.value)} />
        <br />
        author: <input value={newBlogAuthor} onChange={({target}) => setNewBlogAuthor(target.value)} />
        <br />
        url: <input value={newBlogUrl} onChange={({target}) => setNewBlogUrl(target.value)} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>

  )
}

const BlogList = ({user}) => {
  const [ blogs, setBlogs ] = useState([])
  const [ notificationMessage, setNotificationMessage ] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(resBlogs => {
        setBlogs(resBlogs)
      })
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload(true);
  }

  const addBlog = blog => {
    setBlogs(blogs.concat(blog))
    showNotification(`A new blog ${blog.title} by ${blog.author} added`, true)
  }

  const showNotification = (text, success) => {
    setNotificationMessage({text, success})
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }
  
  return (
    <>
      <h2>Blogs</h2>
      <Notification message={notificationMessage}  />

      <p>{user.username} logged in <button onClick={logout}>logout</button></p>

      <h2>Create new</h2>
      <BlogForm addBlog={addBlog} showNotification={showNotification} />

      {blogs.map(b => (
        <Blog key={b.id} blog={b} />
      ))}
    </>
  )
}

export default BlogList