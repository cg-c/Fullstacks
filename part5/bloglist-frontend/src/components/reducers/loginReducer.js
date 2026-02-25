import { createSlice } from "@reduxjs/toolkit";
import loginService from "../../services/login"
import blogService from "../../services/blogs"

const loginSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        name: null,
        userName: null,
    },
    reducers: {
        setUser(state, action) {
            return {
                ...state,
                name: action.payload.name,
                userName: action.payload.userName,
                token: action.payload.token
            }
        },
        unsetUser(state, action) {
            return {
                ...state,
                name: null,
                userName: null,
                token: null
            }
        }
    },
})

export const { setUser, unsetUser } = loginSlice.actions

export const logUserIn = (credentials) => {
    return async dispatch => {
        const user = await loginService.login(credentials)
        blogService.setToken(user.token)
        return dispatch(setUser(user))
    }
}

export const logSavedUser = (user) => {
    return async dispatch => {
        return dispatch(setUser(user))       
    }
}

export const logUserOut = () => {
    return async dispatch => {
        dispatch(unsetUser())
    }
}

export default loginSlice.reducer