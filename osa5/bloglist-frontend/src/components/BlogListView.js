

import React, {useEffect, useState} from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import Notification from './Notification'

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
      createBlog({title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl})
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
        title: <input value={newBlogTitle} onChange={({target}) => setNewBlogTitle(target.value)} />
        <br />
        author: <input value={newBlogAuthor} onChange={({target}) => setNewBlogAuthor(target.value)} />
        <br />
        url: <input value={newBlogUrl} onChange={({target}) => setNewBlogUrl(target.value)} />
      </div>
      <div>
        <button type="submit">create</button>
        <button type='button' onClick={onCancelPress}>cancel</button>
      </div>
    </form>
  )
}

const BlogList = ({user}) => {
  const [ blogs, setBlogs ] = useState([])
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ blogFormVisible, showBlogForm ] = useState(false)
  const [ activeBlogId, setActiveBlogId ] = useState(null)

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
          showNotification(`An error occurred...`, false)
        }
      }
    }
    getBlogs()
  }, [])

  const logout = () => {
    window.localStorage.removeItem('user')
    window.location.reload(true);
  }

  const addBlog = blog => {
    setBlogs(blogs.concat(blog))
    showNotification(`A new blog ${blog.title} by ${blog.author} added`, true)
  }

  const openBlog = blogId => {
    setActiveBlogId(activeBlogId === blogId ? null : blogId)
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
    setNotificationMessage({text, success})
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleError = e => {
    console.log(e.response.data)
    if(e.response && e.response.data.error) {
      showNotification(e.response.data.error, false)
    } else {
      showNotification(`An error occurred...`, false)
    }
  }
  
  return (
    <>
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
          onClick={openBlog}
          active={b.id === activeBlogId}
          onBlogLike={(e) => { e.stopPropagation(); likeBlog(b.id, b.likes + 1) }}
          onBlogRemove={user.username === b.user.username && (() => removeBlog(b))}
        />
      ))}
    </>
  )
}

export default BlogList