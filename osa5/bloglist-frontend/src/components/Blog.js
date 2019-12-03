import React from 'react'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author || 'Anonymous'}
  </div>
)

export default Blog