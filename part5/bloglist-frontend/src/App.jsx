import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notificaton";
import Togglable from "./components/Togglable";
import CreateBlogForm from "./components/CreateBlogForm";
import { setNotification } from "./components/reducers/notificationReducer";
import { initalizeBlogs, createBlog, likeBlog, removeBlog } from "./components/reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import blogs from "./services/blogs";

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // const [notif, setNotif] = useState({ message: null });

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    // blogService.getAll().then((blogs) => sortBlogsByLikes(blogs));
    dispatch(initalizeBlogs())
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);


  // Changed to redux
  const notifyWith = (message, isError = false) => {
    // setNotif({ message, isError });
    // setTimeout(() => {
    //   setNotif({ message: null });
    // }, 5000);
    dispatch(setNotification(message, isError));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      notifyWith("Wrong username or password", true);
    }
  };

  const handleLogOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  // const addBlog = (blogObj) => {
  //   blogFormRef.current.toggleVisibility();
  //   blogService
  //     .create(blogObj)
  //     .then((returnedBlog) => {
  //       setBlogs(blogs.concat(returnedBlog));
  //       notifyWith(
  //         `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
  //       );
  //     })
  //     .catch((error) => {
  //       notifyWith(`fail to add blog: ${error}`);
  //     });
  // };

  const formAndNotif = (returnedBlog) => {
    blogFormRef.current.toggleVisibility();
    notifyWith(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
    );
  }

  const errorCreate = (error) => {
    notifyWith(`fail to add blog: ${error}`);
  }

  const addLike = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    
    const changedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    dispatch(likeBlog(id, changedBlog))
    // try {
    //   const returnedBlog = await blogService.update(id, changedBlog);
      
    //   setBlogs(
    //     blogs
    //       .map((blog) => (blog.id === id ? returnedBlog : blog))
    //       .sort((a, b) => b.likes - a.likes),
    //   );
    // } catch {
    //   (error) => {
    //     setBlogs(blogs.filter((b) => b.id !== id));
    //   };
    // }
  };

  // CHANGE HERE !!!!!!!!!!!!!!!!!!!!!!!
  const deleteBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);

    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(id))
    }

    // try {
    //   if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
    //     await blogService.remove(id);
    //     setBlogs(blogs.filter((b) => b.id !== id));
    //   }
    // } catch {
    //   (error) => {
    //     setBlogs(blogs.filter((b) => b.id !== id));
    //   };
    // }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          data-testid="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          data-testid="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const sortBlogsByLikes = (unsortBlogs) => {
    const sortedBlogs = [...unsortBlogs].sort((a, b) => b.likes - a.likes);
    setBlogs(sortedBlogs);
  };

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogOut}>log out</button>
      </div>
      <br />
      {createBlogForm()}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={() => addLike(blog.id)}
          deleteBlog={() => deleteBlog(blog.id)}
        />
      ))}
    </div>
  );

  const blogFormRef = useRef();

  const createBlogForm = () => (
    <div>
      <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <CreateBlogForm formAndNotif={formAndNotif} errorCreate={errorCreate} />
      </Togglable>
    </div>
  );

  return (
    <div>
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <Notification />
          {loginForm()}
        </div>
      ) : (
        showBlogs()
      )}
    </div>
  );
};

export default App;
