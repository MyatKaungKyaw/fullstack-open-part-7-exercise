import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

const BlogList = ({ blogs }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableBody>
        {blogs.map((blog) => (
          <TableRow key={blog.id}>
            <TableCell>
              <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title + ' ' + blog.author}</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

BlogList.propTpyes = {
  blogs: PropTypes.array.isRequired,
};

export default BlogList;