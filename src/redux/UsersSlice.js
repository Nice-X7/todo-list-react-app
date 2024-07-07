import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
};

export const loadUsers = createAsyncThunk("load/users/start", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
});

export const userSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;