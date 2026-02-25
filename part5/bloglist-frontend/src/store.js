import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './components/reducers/notificationReducer'
import blogReducer from './components/reducers/blogReducer'
import loginReducer from './components/reducers/loginReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        user: loginReducer,
    }
})

export default store