import {createSlice} from '@reduxjs/toolkit'
import userService from '../services/userService'

const initialState = ''

const statsSlice = createSlice({
	name: 'stats',
	initialState,
	reducers: {
		addStats(state, action) {
			return (state = action.payload)
		},
		updateStats(state) {
			return (state = null)
		},
	},
})

export const {addStats, updateStats} = statsSlice.actions

export const initializeStats = (value) => {
	return async (dispatch) => {
		const allStats = await userService.getAll()
		dispatch(addStats(allStats))
	}
}

export const newStats = (value) => {
	return (dispatch) => {
		dispatch(updateStats(value))
	}
}

export default statsSlice.reducer
