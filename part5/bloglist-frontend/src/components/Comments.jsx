import { useDispatch } from "react-redux"
import { commentBlog } from "./reducers/blogReducer"

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
                <input
                    type="text"
                    name="Comment"
                    id="comment-input"
                />
                <button>add comment</button>
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