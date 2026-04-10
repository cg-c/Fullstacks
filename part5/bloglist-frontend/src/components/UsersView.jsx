import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"


const Display = ({ name, count, id }) =>{
    return(
        <TableRow>
            <TableCell>
                <Link to={`/users/${id}`}>{name}</Link>
            </TableCell>
            <TableCell>
                {count}
            </TableCell>
        </TableRow>
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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>blogs created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {merge.map(m => (
                            <Display name={m.author} count={m.count} id={m.id} key={m.id} />
                        ))}    
                    </TableBody>
                </Table>
            </TableContainer>            
        </div>
    )
}

export default UserView;