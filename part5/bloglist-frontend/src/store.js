import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './components/reducers/notificationReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer
    }
})

export default store