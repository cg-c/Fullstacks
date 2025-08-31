import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
    switch(action.type) {
        case "SET_MESS":
            return action.payload
        case "CLEAR_MESS":
            return ""
        default:
            return ""
    }
}


const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notif, notifDispatch] = useReducer(notificationReducer)

    return (
        <NotificationContext.Provider value={[notif, notifDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notifAndDispatch = useContext(NotificationContext)
    return notifAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notifAndDispatch = useContext(NotificationContext)
    return notifAndDispatch[1]
}

export default NotificationContext