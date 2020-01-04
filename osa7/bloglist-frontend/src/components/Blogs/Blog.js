import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getBlog, likeBlog, removeBlog, clearBlog, commentBlog } from '../../reducers/blogReducer'
import { useField } from '../../hooks'
import '../styles.css'

const Blog = ({
  blog,
  ownBlog,
  getBlog,
  likeBlog,
  removeBlog,
  commentBlog,
  clearBlog,
  history
}) => {
  const comment = useField('text')

  useEffect(() => {
    !blog && getBlog()

    return () => {
      clearBlog()
    }
  }, [])

  const onBlogLike = () => {
    likeBlog(blog.id, blog.likes + 1)
  }

  const onBlogRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog)
      history.push('/')
    }
  }

  const handleCommentSubmit = e => {
    e.preventDefault()
    if (comment.value) {
      commentBlog(comment.value)
      comment.reset()
    }
  }

  return (
    <>
      {blog && (
        <div>
          <h1>{blog.title} {blog.author || 'Anonymous'}</h1>
          <a href={blog.url}>{blog.url}</a>
          <p>{blog.likes} likes <button onClick={onBlogLike}>like</button></p>
          <p>Added by {blog.user.name || blog.user.username}</p>
          {ownBlog && <button onClick={onBlogRemove}>remove</button>}
          <h2>comments</h2>
          <form onSubmit={handleCommentSubmit}>
            <input {...comment.fieldProps} /> <button type='submit'>create</button>
          </form>
          <ul>
            {blog.comments && blog.comments.map((comment, i) => (
              <li key={i}>{comment}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  const existingBlog = state.user.allUsers.find(u => u.id === ownProps.userId)
  const blog = existingBlog || state.blog.details
  const ownBlog = blog && blog.user.username === state.user.appUser.username
  return {
    ownBlog: ownBlog,
    blog: blog
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return ({
    getBlog: () => dispatch(getBlog(props.blogId)),
    likeBlog: (id, newLikes) => dispatch(likeBlog(id, newLikes)),
    removeBlog: blog => dispatch(removeBlog(blog)),
    clearBlog: () => dispatch(clearBlog()),
    commentBlog: (comment) => dispatch(commentBlog(props.blogId, comment))
  })
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))
