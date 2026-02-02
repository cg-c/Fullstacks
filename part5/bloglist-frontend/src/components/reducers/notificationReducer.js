import { createSlice } from "@reduxjs/toolkit"

const notifSlice = createSlice({
    name: 'notification',
    initialState: {
        isError: false,
        message: ''
    },
    reducers: {
        changeNotif(state, action) {
            state.isError = action.payload.isError
            state.message = action.payload.message
        },
        clearNotif(state, action) {
            state.message = ''
            state.isError = false
        }
    }
})

export const { changeNotif, clearNotif } = notifSlice.actions

export const setNotification = (message, isError, time = 5000) => {
    return async dispatch => {
        dispatch(changeNotif({message, isError}))
        setTimeout(() => {
            dispatch(clearNotif())
        }, time)
    }
}

export default notifSlice.reducer