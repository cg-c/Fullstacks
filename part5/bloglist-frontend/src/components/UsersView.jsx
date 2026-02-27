
const Display = ({ name, count }) =>{
    return(
        <tr>
            <td>{name}</td>
            <td>{count}</td>
        </tr>
    )
}

const UserView = ({ blogs }) => {
    const authors = blogs.map(blog => blog.author)
    const nameBlogs = {}

    for (const a of authors) {
        if (nameBlogs[a]) {
            nameBlogs[a]++
        }
        else {
            nameBlogs[a] = 1
        }
    }

    const sorted = Object.entries(nameBlogs)
    sorted.sort((a, b) => b[1] - a[1])

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {sorted.map(([key, value]) => (
                        <Display name={key} count={value} />
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}

export default UserView;