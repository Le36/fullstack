import {createSlice} from "@reduxjs/toolkit";

const initialState = 'notification'

const notificationSlice = createSlice({
        name: 'notification',
        initialState,
        reducers: {
            setNotification(state, action) {
                return state = action.payload
            },
            removeNotification(state) {
                return state = ''
            }
        }
    }
)

export const {setNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer