import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, handleLikeClick, user, deleteBlog }) => (
  <div>
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleLikeClick={handleLikeClick}
        user={user}
        deleteBlog={deleteBlog}
      />
    )}
  </div>
)

BlogList.propTpyes = {
  blogs: PropTypes.array.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogList