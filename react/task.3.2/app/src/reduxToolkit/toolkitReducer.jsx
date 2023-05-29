import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
}

export const increment = createAction('INCREMENT')
export const decrement = createAction('DECREMENT')
export const resetCounter = createAction('RESET')

export default createReducer(initialState, (builder) => {
    builder
        .addCase(increment, (state) => {
            state.count = state.count + 1
        })
        .addCase(decrement, (state) => {
            state.count = state.count - 1
        })
        .addCase(resetCounter, (state) => {
            state.count = 0
        })
})