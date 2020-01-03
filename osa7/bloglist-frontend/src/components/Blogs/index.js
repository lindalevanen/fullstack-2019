

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import blogService from '../../services/blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from '../common/Notification'

import { setNotification } from '../../reducers/notificationReducer'
import { initBlogs, setBlogs } from '../../reducers/blogReducer'

const BlogListView = ({ user, setNotification, blogs, initBlogs, setBlogs }) => {
  const [ blogFormVisible, showBlogForm ] = useState(false)

  useEffect(() => {
    const getBlogs = async () => {
      try {
        initBlogs()
      } catch(error) {
        console.log(error.response.data)
        if(error.response.data.error) {
          setNotification(error.response.data.error, false, 10)
        } else {
          setNotification('An error occurred...', false, 10)
        }
      }
    }
    getBlogs()
  }, [setNotification, setBlogs])

  const likeBlog =  async (blogId, newLikes) => {
    try {
      const resBlog = await blogService.update(blogId, newLikes)
      setBlogs(blogs.map(b => b.id !== resBlog.id ? b : resBlog)) // TODO VOTE/LIKE?? TO REDUCER
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
        setNotification(`Deleted ${blog.title} by ${blog.author}`, true, 10)
      }
    } catch(error) {
      handleError(error)
    }
  }

  const handleError = e => {
    console.log(e.response.data)
    if(e.response && e.response.data.error) {
      setNotification(e.response.data.error, false, 10)
    } else {
      setNotification('An error occurred...', false, 10)
    }
  }

  return (
    <div className='blogs-wrapper'>
      {blogFormVisible ? (
        <BlogForm
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

const mapStateToProps = state => {
  return {
    blogs: state.blog,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setNotification,
  initBlogs,
  setBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogListView)