import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        addVote(state, action) {
            const updatedAnecdote = action.payload
            const idOfUpdated = action.payload.id
            return state.map(a =>
                a.id !== idOfUpdated ? a : updatedAnecdote
            )
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    },
})

export const {addVote, setAnecdotes, appendAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteAnecdote = anecdote => {
    return async dispatch => {
        const votedAnecdote = await anecdoteService.updateVote(anecdote)
        dispatch(addVote(votedAnecdote))
    }
}

export default anecdoteSlice.reducer