import { createSlice } from "@reduxjs/toolkit"

const notifSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        changeNotif(state, action) {
            return action.payload
        },
        clearNotif(state, action) {
            return null
        }
    }
})

export const { changeNotif, clearNotif } = notifSlice.actions

export const setNotif = (message, time) => {
    return async dispatch => {
        dispatch(changeNotif(message))
        setTimeout(() => {
            dispatch(clearNotif())
        }, time * 1000)
    }
}

export default notifSlice.reducer