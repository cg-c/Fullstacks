import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notificaton'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 
  const [notif, setNotif] = useState({ message: null })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, isError = false) => {
    setNotif({ message, isError })
    setTimeout(() => {
      setNotif({ message: null })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch {
      notifyWith('Wrong username or password', true)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObj)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notifyWith(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
      .catch (error => {
        notifyWith(`fail to add blog: ${error}`)
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type='text'
          value={username}
          name='Username'
          onChange={({target}) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input
          type='password'
          value={password}
          name='password'
          onChange={({target}) => setPassword(target.value)}
          />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <Notification notif={notif} />
      <div>
        {user.name} logged in
        <button onClick={handleLogOut}>log out</button>
      </div>
      <p></p> 
      {createBlogForm()}    
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const blogFormRef = useRef()

  const createBlogForm = () => (
    <div>
      <Togglable buttonLabel="create blog" ref={blogFormRef} >
        <CreateBlogForm
          addBlog={addBlog}
        />
      </Togglable>
    </div>
  )

  return (
    <div>
      {user === null ?
        <div>
          <h2>log in to application</h2>
          <Notification notif={notif} />
          {loginForm()}
        </div> :
        showBlogs()
        }
    </div>
  )
}

export default App