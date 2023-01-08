import {createSlice} from '@reduxjs/toolkit'

const initialState = ''

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login(state, action) {
			return (state = action.payload)
		},
		logout(state) {
			return (state = null)
		},
	},
})

export const {login, logout} = userSlice.actions

export const setUser = (value) => {
	return (dispatch) => {
		dispatch(login(value))
	}
}

export const removeUser = (value) => {
	return (dispatch) => {
		dispatch(logout(value))
	}
}

export default userSlice.reducer
