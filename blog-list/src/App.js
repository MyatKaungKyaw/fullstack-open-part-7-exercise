import { useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import LogIn from "./components/LogIn";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from './services/users'
import Main from "./components/Main";
import UserList from './components/UserList'
import UserDetail from "./components/UserDetail";
import { useQueryClient, useMutation, useQuery } from 'react-query'
import { useMessageDispatch } from "./contexts/MessageContext";
import { useUserDispatch, useUserValue } from "./contexts/UserContext";
import { useNavigate, Navigate, Route, Routes, useMatch } from "react-router-dom";

const App = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const userDispatch = useUserDispatch()
  const user = useUserValue()
  //notification
  const messageDispatch = useMessageDispatch()
  //ref
  const createBlogRef = useRef();

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: newBlog => {
      const blogs = queryClient.getQueryData('blogs')
      const sortBlogs = sortBlogsDesc(blogs.concat(newBlog))
      queryClient.setQueryData('blogs', sortBlogs)
      showMsg(`a new blog ${newBlog.title} added`);
    }
  })

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: updBlog => {
      const blogs = queryClient.getQueryData('blogs')
      const sortBlogs = sortBlogsDesc(blogs.map(blog => blog.id === updBlog.id ? updBlog : blog))
      queryClient.setQueryData('blogs', sortBlogs)
    }
  })

  const deleteBlogMutataion = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUserRelated(JSON.parse(loggedInUser));
    } else {
      navigate('/login')
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const loginUser = await loginService.validateUser({ username, password });

      window.localStorage.setItem("loggedInUser", JSON.stringify(loginUser));
      setUserRelated(loginUser);
      navigate('/')
    } catch (err) {
      showErrMsg("username or password incorrect");
      console.error(err);
    }
  };

  const createBlog = async (blog) => {
    try {
      newBlogMutation.mutate(blog)
      createBlogRef.current.hide();
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
      updateBlogMutation.mutate(likeIncBlog)
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      deleteBlogMutataion.mutate(blogId)
    } catch (err) {
      console.error(err);
    }
  };

  //helper functions
  function setUserRelated(user) {
    if (user !== null) {
      // setUser(user);
      userDispatch({
        type: 'update',
        user,
      })
      blogService.setToken(user.token);
    } else {
      // setUser(null);
      userDispatch({
        type: 'reset',
      })
      blogService.setToken(null);
    }
  };

  const sortBlogsDesc = (blogArr) =>
    blogArr.sort((a, b) => (a.likes > b.likes ? -1 : 0));

  const showMsg = (message) => {
    messageDispatch({
      type: 'updateMessage',
      message: message,
    })
    setTimeout(() => {
      messageDispatch({ type: 'reset' })
    }, 5000);
  };

  const showErrMsg = (message) => {
    messageDispatch({
      type: 'updateMessage',
      message: message,
    })
    messageDispatch({ type: 'updateErrStatus' })
    setTimeout(() => {
      messageDispatch({ type: 'reset' })
    }, 5000);
  };

  //query
  const blogsResult = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false,
  })

  const usersResult = useQuery('users', userService.getAll, {
    refetchOnWindowFocus: false,
  })

  const users = usersResult.data
  console.log(user)

  //useMatch
  const logInMatch = useMatch('/login')
  const userDetailMatch = useMatch('/users/:id')
  const userDetail = userDetailMatch && !usersResult.isLoading
    ? users.find(user => user.id === userDetailMatch.params.id)
    : null

  const blogs = blogsResult.isLoading
    ? null
    : sortBlogsDesc(blogsResult.data)

  //components
  const Blogs = () => (
    <>
      <Togglable text="new blog" ref={createBlogRef}>
        <CreateBlog createBlog={createBlog} />
      </Togglable>
      {blogsResult.isLoading
        ? <div>Loading blogs data</div>
        : <BlogList
          blogs={blogs}
          handleLikeClick={handleLikeClick}
          user={user}
          deleteBlog={deleteBlog}
        />
      }
    </>
  )

  return (
    <>
      <Main>
        {!logInMatch && user !== null
          && (<>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            <button onClick={handleLogOut}>logout</button>
          </>)
        }
        < Routes >
          <Route path='/users/:id' element={<UserDetail {...userDetail} />} />
          <Route path='/users' element={<UserList />} />
          <Route path='/login' element={<LogIn handleLogin={handleLogin} />} />
          <Route path='/' element={<Blogs />} />
        </Routes>
      </Main >
    </>
  );
};

export default App;
