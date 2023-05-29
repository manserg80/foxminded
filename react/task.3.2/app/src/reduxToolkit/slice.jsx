import { createSlice } from "@reduxjs/toolkit"


const toolkitSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0
    },
    reducers: {
        increment(state) {
            state.count += 1
        },
        decrement(state) {
            state.count -= 1
        },
        reset(state) {
            state.count = 0
        }
    }
})

export default toolkitSlice.reducer
export const {increment, decrement, reset} = toolkitSlice.actions