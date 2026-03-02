import { useParams } from "react-router-dom"

const UserBlogs = ({ blogs }) => {
    const id = useParams().id
    const blog = blogs.find(b => b.id === id)

    if (!blog) {
        return null
    }

    const authorBlogs = blogs.filter(b => b.author === blog.author)

    return (
        <div>
            <h2>{blog.author}</h2>
            <h3>added blogs</h3>
            <ul>
            {
                authorBlogs.map(a => (
                    <li key={a.id}>{a.title}</li>
                ))
            }
            </ul>

        </div>
    )
}

export default UserBlogs