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
        }
    },
})

export const { addBlog, setBlogs, sortBlogs } = blogSlice.actions

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

export default blogSlice.reducer