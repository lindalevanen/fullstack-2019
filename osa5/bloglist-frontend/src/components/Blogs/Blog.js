import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../styles.css'

const Blog = ({ blog, onBlogLike, onBlogRemove }) => {
  const [ active, setActive ] = useState(false)

  return (
    <div className='blog-item' onClick={() => setActive(!active)}>
      <div className='title-author'>{blog.title} {blog.author || 'Anonymous'}</div>
      {active && (
        <div className='active-wrapper'>
          <p>{blog.url}</p>
          <p>{blog.likes} likes <button onClick={onBlogLike}>like</button></p>
          <p>Added by {blog.user.name || blog.user.username}</p>
        </div>
      )}
      {onBlogRemove && <button onClick={() => onBlogRemove(blog.id)}>remove</button>}
    </div>

  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onBlogLike: PropTypes.func.isRequired,
  onBlogRemove: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ])
}


export default Blog