import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: false,
};

export const loadTodos = createAsyncThunk(
  'load/todos/start',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return await response.json();
  }
);

export const removeTodo = createAsyncThunk(
  'remove/todo/start',
  async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

export const checkTodo = createAsyncThunk(
  'check/load/start',
  async ({ id, completed }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        completed: !completed,
      }),
    });
    const data = await response.json();
    return data;
  }
);

export const todosSlice = createSlice({
  name: 'Todos',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })

      .addCase(removeTodo.pending, (state, action) => {
        state.todos = state.todos.map((item) => {
          if (item.id === action.meta.arg) {
            return { ...item, deleting: true };
          }
          return item;
        });
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.todos = state.todos.map((item) => {
          if (item.id === action.meta.arg) {
            return { ...item, deleting: false };
          }
          return item;
        });
      })

      .addCase(checkTodo.pending, (state, action) => {
        state.todos = state.todos.map((todo) => {
          if (todo.id === action.meta.arg.id) {
            return { ...todo, checking: true };
          }
          return todo;
        });
      })
      .addCase(checkTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, ...action.payload, checking: false };
          }
          return todo;
        });
      })
      .addCase(checkTodo.rejected, (state, action) => {
        state.todos = state.todos.map((todo) => {
          if (todo.id === action.meta.arg.id) {
            return { ...todo, checking: false };
          }
          return todo;
        });
      });
  },
});

export default todosSlice.reducer;