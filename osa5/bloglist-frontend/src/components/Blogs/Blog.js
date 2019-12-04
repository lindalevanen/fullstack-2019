import React from 'react'
import PropTypes from 'prop-types'
import '../styles.css'

const Blog = ({ blog, onClick, active, onBlogLike, onBlogRemove }) => (
  <div className='blog-item' onClick={onClick}>
    {blog.title} {blog.author || 'Anonymous'}
    {active && (
      <>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={onBlogLike}>like</button></p>
        <p>Added by {blog.user.name || blog.user.username}</p>
      </>
    )}
    {onBlogRemove && <button onClick={() => onBlogRemove(blog.id)}>remove</button>}
  </div>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  onBlogLike: PropTypes.func.isRequired,
  onBlogRemove: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ])
}


export default Blog