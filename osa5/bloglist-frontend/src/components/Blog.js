import React from 'react'
import './styles.css'

const Blog = ({ blog, onClick, active, onBlogLike, onBlogRemove }) => (
  <div className='blog-item' onClick={() => onClick(blog.id)}>
    {blog.title} {blog.author || 'Anonymous'}
    {active && (
      <>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={onBlogLike}>like</button></p>
        <p>Added by {blog.user.name || blog.user.username}</p>
      </>
    )}
    {onBlogRemove && <button onClick={() => onBlogRemove(blog.id)}>remove</button>}
  </div>
)

export default Blog