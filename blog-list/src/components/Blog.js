import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikeClick, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const show = (e) => {
    setVisible(true)
  }

  const hide = (e) => {
    setVisible(false)
  }

  const likeClick = async (e) => {
    await handleLikeClick(blog)
  }

  const deleteClick = async (e) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await deleteBlog(blog.id)
    }
  }

  return (
    <div className='blog-style'>
      <p className='inline'>{blog.title} {blog.author}</p>
      {!visible && <button onClick={show} className='inline'>view</button>}
      {visible && <>
        <button onClick={hide} className='inline'>hide</button>
        <a href={blog.url} target='_blank' rel="noreferrer" className='blog-url blog-link'>{blog.url}</a>
        <div>
          <p className='blog-like'>likes : {blog.likes} </p>
          <button onClick={likeClick} className='blog-like'>like</button>
        </div>
        {blog.user && <div>{blog.user.name}</div>}
        {blog.user && blog.user.username === user.username &&
          <button onClick={deleteClick} className="delete-button">remove</button>
        }
      </>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog