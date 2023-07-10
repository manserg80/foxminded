import {combineReducers, configureStore} from '@reduxjs/toolkit'
import toolkitSlice from './slice'

const rootReducer = combineReducers({
  counter: toolkitSlice
})

export const store = configureStore({
  reducer: rootReducer
})