import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "./reducers/blogReducer";
import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";

const CreateBlogForm = (/*{ addBlog }*/ {formAndNotif, errorCreate}) => {
  const dispatch = useDispatch()

  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [url, setUrl] = useState("");

  const makeBlog = (event) => {
    event.preventDefault();

    const title = event.target.Title.value
    const author = event.target.Author.value
    const url = event.target.URL.value

    event.target.Title.value = ''
    event.target.Author.value = ''
    event.target.URL.value = ''
    
    dispatch(createBlog({
      title: title, 
      author: author, 
      url: url,
    }))
      .then((returnedBlog) => {
        formAndNotif(returnedBlog.payload)
      })
      .catch((error) => {
        errorCreate(error)
      });

    // addBlog({
    //   title: title,
    //   author: author,
    //   url: url,
    // });

    // setTitle("");
    // setAuthor("");
    // setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={makeBlog}>
        <div>
          title:
          <TextField
            type="text"
            // value={title}
            name="Title"
            id="title-input"
            data-testid="title"
            // onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <TextField
            type="text"
            // value={author}
            name="Author"
            id="author-input"
            data-testid="author"
            // onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <TextField
            type="text"
            // value={url}
            name="URL"
            id="url-input"
            data-testid="url"
            // onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>create</Button>
      </form>
    </div>
  );
};

// CreateBlogForm.propTypes = {
//   addBlog: PropTypes.func.isRequired
// }

export default CreateBlogForm;
