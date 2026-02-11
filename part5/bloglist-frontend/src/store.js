import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './components/reducers/notificationReducer'
import blogReducer from './components/reducers/blogReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer
    }
})

export default store