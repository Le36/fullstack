import {createSlice} from "@reduxjs/toolkit";

const initialState = ''

const filterSlice = createSlice({
        name: 'filter',
        initialState,
        reducers: {
            setFilter(state, action) {
                return state = action.payload
            },
            removeFilter(state) {
                return state = ''
            }
        }
    }
)

export const {setFilter, removeFilter} = filterSlice.actions
export default filterSlice.reducer