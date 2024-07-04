import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
  loading: false
}

export const loadTodos = createAsyncThunk(
  'load/todos/start',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    
    return response.json()
  }
)

export const removeTodo = createAsyncThunk(
  'remove/todo/start',
  async ({id}) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE"
    })

    if (response.ok) {
      return id
    } else {
      throw new Error('Failed to delete the todo item')
    }
  }
)


export const todosSlice = createSlice({
  name: 'Todos',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(loadTodos.pending, (state) => {
      state.loading = true
    })

    .addCase(loadTodos.fulfilled, (state, action) => {
      state.loading = false
      state.todos = action.payload
    })

    .addCase(removeTodo.pending, state => {
      state.loading = true
    })

    .addCase(removeTodo.fulfilled, (state, action) => {
      state.loading = false
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    })

    .addCase(removeTodo.rejected, (state) => {
      state.loading = false
    })
  }
})

export default todosSlice.reducer