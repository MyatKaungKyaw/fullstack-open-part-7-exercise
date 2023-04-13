import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => (
  <div>
    {blogs.map((blog) => (
      <Link key={blog.id} className='blog-block' to={`/blogs/${blog.id}`}>{blog.title+' '+blog.author}</Link>
    ))}
  </div>
);

BlogList.propTpyes = {
  blogs: PropTypes.array.isRequired,
};

export default BlogList;
