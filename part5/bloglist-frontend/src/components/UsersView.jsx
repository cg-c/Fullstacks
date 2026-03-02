import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Display = ({ name, count, id }) =>{
    return(
        <tr>
            <td><Link to={`/users/${id}`}>{name}</Link></td>
            <td>{count}</td>
        </tr>
    )
}

const UserView = ({ blogs }) => {
    const nameBlogs = {}
    const nameId = blogs.map(blog =>
    ({
        author: blog.author,
        id: blog.id
    })
    )

    for (const n of nameId) {
        if (nameBlogs[n.author]) {
            nameBlogs[n.author]++
        }
        else {
            nameBlogs[n.author] = 1
        }
    }

    const seen = new Set()

    const filter = nameId.filter(n => {
        const dupe = seen.has(n.author)
        seen.add(n.author)
        return !dupe
    })

    const merge = filter.map(f => ({
        ...f,
        count: nameBlogs[f.author]
    }))

    merge.sort((a, b) => b.count - a.count)

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {merge.map(m => (
                        <Display name={m.author} count={m.count} id={m.id} key={m.id} />
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}

export default UserView;