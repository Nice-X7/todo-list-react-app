import { configureStore } from '@reduxjs/toolkit'
import TodoReducer from './TodosSlice'

export const store = configureStore({
  reducer: {
    todos: TodoReducer
  },
})