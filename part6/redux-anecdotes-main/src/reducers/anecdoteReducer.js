import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            state.push(action.payload)
        },
        addVote(state, action) {
            const id = action.payload
            const anecdoteToChange = state.find(a => a.id === id)
            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1
            }
            return state.map(a =>
                a.id !== id ? a : changedAnecdote
            )
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    },
})

export const {addVote, createAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const notes = await anecdoteService.getAll()
        dispatch(setAnecdotes(notes))
    }
}

export default anecdoteSlice.reducer