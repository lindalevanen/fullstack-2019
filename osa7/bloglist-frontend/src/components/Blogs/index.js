

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import BlogForm from './BlogForm'

import { setNotification } from '../../reducers/notificationReducer'
import { initBlogs } from '../../reducers/blogReducer'
import '../styles.css'

const BlogListItem = ({ blog }) => (
  <Link className='blog-item' to={`blogs/${blog.id}`}>
    <div className='title-author'>{blog.title} {blog.author || 'Anonymous'}</div>
  </Link>
)

const BlogListView = ({ blogs, initBlogs }) => {
  const [ blogFormVisible, showBlogForm ] = useState(false)

  useEffect(() => {
    initBlogs()
  }, [initBlogs])

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
        <BlogListItem
          key={b.id}
          blog={b}
        />
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blog.all,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setNotification,
  initBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogListView)