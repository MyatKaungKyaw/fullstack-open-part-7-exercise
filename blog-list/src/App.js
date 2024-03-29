import { useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import BlogDetail from './components/BlogDetail'
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
import { Link, Navigate, Route, Routes, useMatch, useNavigate, } from "react-router-dom";
import {
  Button,
  Container,
  AppBar,
  Toolbar,
} from '@mui/material'

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

  const addCommentBlogMutation = useMutation(blogService.addComment, {
    onSuccess: res => {
      const blogId = res.data.blogId
      const comment = res.data.comment
      const blogs = queryClient.getQueryData('blogs')
      const sortBlogs = sortBlogsDesc(blogs.map(blog => {
        if (blog.id === blogId) {
          blog.comments = blog.comments.concat(comment)
        }
        return blog
      }))
      queryClient.setQueryData('blogs', sortBlogs)
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

  const handleComment = async (blogId, comment) => {
    try {
      console.log('handle comment', comment)
      addCommentBlogMutation.mutate({ blogId, comment })
    } catch (err) {
      console.error(err)
    }
  }

  //helper functions
  const setUserRelated = (user) => {
    if (user !== null) {
      userDispatch({
        type: 'update',
        user,
      })
      blogService.setToken(user.token);
    } else {
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

  const blogs = blogsResult.isLoading
    ? null
    : sortBlogsDesc(blogsResult.data)

  //useMatch
  const logInMatch = useMatch('/login')
  const userDetailMatch = useMatch('/users/:id')
  const userDetail = userDetailMatch && !usersResult.isLoading
    ? users.find(user => user.id === userDetailMatch.params.id)
    : null

  const blogDetailMatch = useMatch('/blogs/:id')
  const blogDetail = blogDetailMatch && blogs !== null
    ? blogs.find(blog => blog.id === blogDetailMatch.params.id)
    : null

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
    <Container>
      <Main>
        {!logInMatch && user !== null
          && (
            <>
              <AppBar position='static'>
                  <Toolbar>
                    <Button color='inherit' component={Link} to='/'>blogs</Button>
                    <Button color='inherit' component={Link} to='/users'>users</Button>
                    <p>{user.name} logged in</p>
                    <Button color='inherit' onClick={handleLogOut}>logout</Button>
                  </Toolbar>
              </AppBar>
              <h2>blog app</h2>
            </>
          )
        }
        < Routes >
          <Route path='/users/:id' element={<UserDetail {...userDetail} />} />
          <Route path='/users' element={<UserList />} />
          <Route path='/login' element={<LogIn handleLogin={handleLogin} />} />
          <Route path='/blogs/:id' element={<BlogDetail blog={blogDetail} likeClick={handleLikeClick} user={user} handleComment={handleComment} />} />
          <Route path='/' element={user === null ? <Navigate to='/login' /> : <Blogs />} />
        </Routes>
      </Main >
    </Container>
  );
};

export default App;
