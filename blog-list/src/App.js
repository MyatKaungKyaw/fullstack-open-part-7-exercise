import { useState, useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import LogIn from "./components/LogIn";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Main from "./components/Main";
import { useQueryClient, useMutation, useQuery } from 'react-query'
import { useMessageDispatch } from "./contexts/MessageContext";

const App = () => {
  const queryClient = useQueryClient()
  const [user, setUser] = useState(null);
  //notification
  const messageDispatch = useMessageDispatch()
  //ref
  const createBlogRef = useRef();

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: newBlog => {
      const blogs = queryClient.getQueryData('blogs')
      const sortBlogs = sortBlogsDesc(blogs.concat(newBlog))
      queryClient.setQueryData('blogs', sortBlogs)
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
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const loginUser = await loginService.validateUser({ username, password });

      window.localStorage.setItem("loggedInUser", JSON.stringify(loginUser));
      setUserRelated(loginUser);
    } catch (err) {
      showErrMsg("username or password incorrect");
      console.error(err);
    }
  };

  const createBlog = async (blog) => {
    try {
      newBlogMutation.mutate(blog)
      createBlogRef.current.hide();
      showMsg(`a new blog ${blog.title} added`);
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
  const setUserRelated = (user) => {
    if (user !== null) {
      setUser(user);
      blogService.setToken(user.token);
    } else {
      setUser(null);
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


  if (user === null) {
    return (<Main>
      <LogIn handleLogin={handleLogin} />
    </Main>)
  }

  if (blogsResult.isLoading) {
    return (<Main>
      <div>Loading data...</div>
    </Main>)
  }

  const blogs = sortBlogsDesc(blogsResult.data)

  return (
    <Main>
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
    </Main>
  );
};

export default App;
