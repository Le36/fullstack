import {createSlice} from '@reduxjs/toolkit'
import blogService from '../services/blogService'
import {addLike} from './blogReducer'
import userService from '../services/userService'

const initialState = ''

const statsSlice = createSlice({
	name: 'stats',
	initialState,
	reducers: {
		addStats(state, action) {
			return (state = action.payload)
		},
		removeStats(state) {
			return (state = null)
		},
	},
})

export const {addStats, removeStats} = statsSlice.actions

export const initializeStats = (value) => {
	return async (dispatch) => {
		const allStats = await userService.getAll()
		dispatch(addStats(allStats))
	}
}

export const emptyStats = (value) => {
	return (dispatch) => {
		dispatch(removeStats(value))
	}
}

export default statsSlice.reducer
