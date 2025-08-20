import { createSlice } from "@reduxjs/toolkit"

const notifSlice = createSlice({
    name: 'notification',
    initialState: 'Testing',
    reducers: {
        changeNotif(state, action) {
            return state
        },
    }
})

export const { changeNotif } = notifSlice.actions
export default notifSlice.reducer