import { act } from "react"
import { createSlice, current } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdotes(state, action) {
      const updated = action.payload
      return state.map(a => a.id !== updated.id ? a : updated
      ).sort((a, b) => b.votes - a.votes)
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdotes } = anecdoteSlice.actions 

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

export const toggleVote = (anecdote) => {
  return async dispatch => {
    const updateAnecdote = await anecdoteService.update(anecdote)
    dispatch(updateAnecdotes(updateAnecdote))
  }
}

export default anecdoteSlice.reducer