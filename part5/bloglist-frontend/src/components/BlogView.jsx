import { useParams } from "react-router-dom"

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
                <button onClick={() => addLike(blog.id)} className="likeButton">
                    like
                </button>
            </div>
            <div>
                <h3>comments</h3>
                {/* <ol>
                    {blog.comments.map(c => (
                        <li>{c}</li>
                    ))}
                </ol> */}
            </div>
            
            <span>added by {blog.author}</span>
        </div>
    )
}


export default BlogView;