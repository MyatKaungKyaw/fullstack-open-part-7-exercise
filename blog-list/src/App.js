import { useState, useEffect, useRef, useContext } from "react";
import BlogList from "./components/BlogList";
import LogIn from "./components/LogIn";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import NotificationBar from "./components/NotificationBar";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Main from "./components/Main";
import { useQuery } from 'react-query'
import { useMessageDispatch } from "./contexts/MessageContext";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  //notification
  const messageDispatch = useMessageDispatch()
  //ref
  const createBlogRef = useRef();
  //useContext
  //const MessageContext = useContext(null)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setAllBlogs();
      setUserRelated(JSON.parse(loggedInUser));
    }
    // eslint-disable-next-line
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const loginUser = await loginService.validateUser({ username, password });

      await setAllBlogs();
      window.localStorage.setItem("loggedInUser", JSON.stringify(loginUser));
      setUserRelated(loginUser);
    } catch (err) {
      showErrMsg("username or password incorrect");
      console.error(err);
    }
  };

  const createBlog = async (blog) => {
    try {
      const returnBlog = await blogService.create(blog);
      createBlogRef.current.hide();
      showMsg(`a new blog ${returnBlog.title} added`);
      await setAllBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedInUser");
    setUserRelated(null);
  };

  const handleLikeClick = async (blog) => {
    try {
      const likeIncBlog = {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user && blog.user.id,
      };
      const sortBlogs = sortBlogsDesc(
        blogs.map((blog) => (blog.id === likeIncBlog.id ? likeIncBlog : blog))
      );
      setBlogs(sortBlogs);
      await blogService.update(likeIncBlog);
    } catch (err) {
      await setAllBlogs();
      console.error(err);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId);
      await setAllBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  //helper functions
  const setUserRelated = (user) => {
    if (user !== null) {
      setUser(user);
      blogService.setToken(user.token);
    } else {
      setUser(null);
      blogService.setToken(null);
    }
  };

  // const blogsResult = useQuery('blogs', blogService.getAll, {
  //   refetchOnWindowFocus: false,
  // })

  // const blogs = blogsResult.data

  const setAllBlogs = async () => {
    const returnBlogs = await blogService.getAll();
    const sortBlogs = sortBlogsDesc(returnBlogs);
    setBlogs(sortBlogs);
  };

  const sortBlogsDesc = (blogArr) =>
    blogArr.sort((a, b) => (a.likes > b.likes ? -1 : 0));

  const showMsg = (message) => {
    messageDispatch({
      type:'updateMessage',
      message: message,
    })
    setTimeout(() => {
      messageDispatch({type:'reset'})
    }, 5000);
  };
  
  const showErrMsg = (message) => {
    messageDispatch({
      type:'updateMessage',
      message: message,
    })
    messageDispatch({type:'updateErrStatus'})
    setTimeout(() => {
      messageDispatch({type:'reset'})
    }, 5000);
  };

  return (
    <Main>
      {user === null && <LogIn handleLogin={handleLogin} />}
      {user !== null &&
        (blogsResult.isLoading ? (
          <div>Loading data...</div>
        ) : (
          <>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            <button onClick={handleLogOut}>logout</button>

            <Togglable text="new blog" ref={createBlogRef}>
              <CreateBlog createBlog={createBlog} />
            </Togglable>
            <BlogList
              blogs={blogs}
              handleLikeClick={handleLikeClick}
              user={user}
              deleteBlog={deleteBlog}
            />
          </>
        ))}
    </Main>
  );
};

export default App;
