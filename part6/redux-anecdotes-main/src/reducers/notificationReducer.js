import {createSlice} from "@reduxjs/toolkit";

const initialState = 'notification'
let timeout

const notificationSlice = createSlice({
        name: 'notification',
        initialState,
        reducers: {
            setValue(state, action) {
                return state = action.payload
            },
            removeNotification(state) {
                return state = ''
            }
        }
    }
)

export const {setValue, removeNotification} = notificationSlice.actions

export const setNotification = (value, time) => {
    return dispatch => {
        dispatch(setValue(value))
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer