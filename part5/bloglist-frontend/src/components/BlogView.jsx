import { useParams } from "react-router-dom"
import Comments from "./Comments"
import { Button } from "@mui/material"

const BlogView = ({ blogs, addLike }) => {
    const id = useParams().id
    const blog = blogs.find(b => b.id === id)

    if (!blog) {
        return null
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>
            <div>
                <span>{blog.likes} likes</span>
                <Button onClick={() => addLike(blog.id)} className="likeButton"
                    variant="contained" style={{ marginTop: 10 }} >
                    like
                </Button>
            </div>
            <span>added by {blog.author}</span>
            <Comments blog={blog} />
        </div>
    )
}


export default BlogView;