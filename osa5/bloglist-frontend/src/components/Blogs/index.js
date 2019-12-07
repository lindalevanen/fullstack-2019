

import React, { useEffect, useState } from 'react'
import blogService from '../../services/blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from '../common/Notification'


const BlogListView = ({ user }) => {
  const [ blogs, setBlogs ] = useState([])
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ blogFormVisible, showBlogForm ] = useState(false)

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const resBlogs = await blogService.getAll()
        setBlogs(resBlogs)
      } catch(error) {
        console.log(error.response.data)
        if(error.response.data.error) {
          showNotification(error.response.data.error, false)
        } else {
          showNotification('An error occurred...', false)
        }
      }
    }
    getBlogs()
  }, [])

  const logout = () => {
    window.localStorage.removeItem('user')
    window.location.reload(true)
  }

  const addBlog = blog => {
    setBlogs(blogs.concat(blog))
    showNotification(`A new blog ${blog.title} by ${blog.author} added`, true)
  }

  const likeBlog =  async (blogId, newLikes) => {
    try {
      const resBlog = await blogService.update(blogId, newLikes)
      setBlogs(blogs.map(b => b.id !== resBlog.id ? b : resBlog))
    } catch(error) {
      handleError(error)
    }
  }

  const removeBlog = async blog => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        const newBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(newBlogs)
        showNotification(`Deleted ${blog.title} by ${blog.author}`, true)
      }
    } catch(error) {
      handleError(error)
    }
  }

  const showNotification = (text, success) => {
    setNotificationMessage({ text, success })
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleError = e => {
    console.log(e.response.data)
    if(e.response && e.response.data.error) {
      showNotification(e.response.data.error, false)
    } else {
      showNotification('An error occurred...', false)
    }
  }

  return (
    <div className='blogs-wrapper'>
      <h2>Blogs</h2>
      <Notification message={notificationMessage}  />

      <p>{user.username} logged in <button onClick={logout}>logout</button></p>

      {blogFormVisible ? (
        <BlogForm
          addBlog={addBlog}
          showNotification={showNotification}
          onHideForm={() => showBlogForm(false)}
        />
      ) : (
        <button onClick={() => showBlogForm(true)}>new blog</button>
      )}

      {[...blogs].sort((a,b) => b.likes - a.likes).map(b => (
        <Blog
          key={b.id}
          blog={b}
          onBlogLike={(e) => { e.stopPropagation(); likeBlog(b.id, b.likes + 1) }}
          onBlogRemove={
            user.username === b.user.username &&
              (e => { e.stopPropagation(); removeBlog(b) })
          }
        />
      ))}
    </div>
  )
}

export default BlogListView