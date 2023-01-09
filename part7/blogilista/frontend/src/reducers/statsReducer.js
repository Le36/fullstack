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
	},
})

export const {addStats} = statsSlice.actions

export const initializeStats = () => {
	return async (dispatch) => {
		const allStats = await userService.getAll()
		dispatch(addStats(allStats))
	}
}

export default statsSlice.reducer
