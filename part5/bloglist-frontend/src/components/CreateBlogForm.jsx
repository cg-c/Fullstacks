import { useState } from "react"

const CreateBlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('') 

    const createBlog = (event) => {
        event.preventDefault()
        addBlog({
            title: title,
            author: author,
            url: url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createBlog}>
                <div>
                title:
                    <input
                    type='text'
                    value={title}
                    name='Title'
                    onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                author:
                    <input
                    type='text'
                    value={author}
                    name='Author'
                    onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                url:
                    <input
                    type='text'
                    value={url}
                    name='URL'
                    onChange={({target}) => setUrl(target.value)}
                    />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

export default CreateBlogForm