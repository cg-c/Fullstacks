import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blogs"

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        addBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        sortBlogs(state, action) {
            state.sort((a, b) => b.likes - a.likes)
        },
        addLike(state, action) {
            const id = action.payload
            const blogToLike = state.find(b => b.id === id)
            const likedBlog = {
                ...blogToLike,
                likes: blogToLike.likes + 1
            }

            return state.map(blog =>
                blog.id !== id ? blog : likedBlog
            )
        },
        deleteBlog(state, action) {
            const id = action.payload            
            console.log(id)
            return state.filter(b => b.id !== id)
        },
        comment(state, action) {
            const {id, comment } = action.payload

            return state.map(blog =>
                blog.id !== id 
                    ? blog
                    : {
                        ...blog,
                        comments: [...blog.comments, comment]
                    }
            )
        }
    },
})

export const { addBlog, setBlogs, sortBlogs, addLike, deleteBlog, comment } = blogSlice.actions

export const initalizeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
        dispatch(sortBlogs(blogs))
    }
}

export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        return dispatch(addBlog(newBlog))
    }
}

export const likeBlog = (id, content) => {
    return async dispatch => {
        await blogService.update(id, content)
        return dispatch(addLike(id))
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        return dispatch(deleteBlog(id))
    }
}

export const commentBlog = (id, content) => {
    return async dispatch => {
        await blogService.addComment(id, content)
        return dispatch(comment(id, content))
    }
}

export default blogSlice.reducer