import Blog from "./Blog";
import PropTypes from "prop-types";

const BlogList = ({ blogs, handleLikeClick, deleteBlog }) => (
  <div>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        handleLikeClick={handleLikeClick}
        deleteBlog={deleteBlog}
      />
    ))}
  </div>
);

BlogList.propTpyes = {
  blogs: PropTypes.array.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default BlogList;
