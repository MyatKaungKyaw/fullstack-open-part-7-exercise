import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const titleOnChange = (e) => {
    setTitle(e.target.value)
  }

  const authorOnChange = (e) => {
    setAuthor(e.target.value)
  }

  const urlOnChange = (e) => {
    setUrl(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
    }
    await props.createBlog(blog)
    aftCreateBlogHandler()
  }

  const aftCreateBlogHandler = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type='text'
            name='title'
            value={title}
            onChange={titleOnChange}
            placeholder='title'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            name='author'
            value={author}
            onChange={authorOnChange}
            placeholder='author'
          />
        </div>
        <div>
          url:
          <input
            type='text'
            name='url'
            value={url}
            onChange={urlOnChange}
            placeholder='url'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

CreateBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default CreateBlog