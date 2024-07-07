import { configureStore } from '@reduxjs/toolkit'
import TodosReducer from './TodosSlice'
import UserReducer from './UsersSlice'

export const store = configureStore({
  reducer: {
    todos: TodosReducer,
    users: UserReducer
  },
})