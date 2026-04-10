import { useDispatch } from "react-redux"
import { commentBlog } from "./reducers/blogReducer"
import { Button, TextField } from "@mui/material"

const Comments = ({ blog }) => {
    const dispatch = useDispatch()

    const makeComment = (event) => {
        event.preventDefault()

        const comment = event.target.Comment.value
        event.target.Comment.value = ''

        dispatch(commentBlog(blog.id, comment))
    }


    return (
        <div>
            <h3>comments</h3>
            <form onSubmit={makeComment}>
                <TextField
                    type="text"
                    name="Comment"
                    id="comment-input"
                    size="small"
                    style={{ marginTop: 10 }}
                />
                <Button variant="contained" style={{ marginTop: 10 }}>add comment</Button>
            </form>
            
            <div>
                <ul>
                    {blog.comments.map(c => (
                        <li key={c}>{c}</li>
                    ))}
                </ul>
            </div>
            
        </div>
    )

}

export default Comments