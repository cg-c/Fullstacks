import { useState } from "react"

const Blog = ({ blog, addLike }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }

  const toggleView = () => {
    setView(!view)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleView}>view</button>
      </div>
      <div style={showWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={toggleView}>hide</button>
        <br/>
          {blog.url}
        <br/>
          {blog.likes} 
          <button onClick={addLike}>like</button>
        <br/>
          {blog.user.name}
      </div>
  </div>
)}


export default Blog