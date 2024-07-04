import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  loading: false
}

export const loadUsers = () => {
  return dispatch => {
    dispatch({type: 'load/users/start'})

    fetch('https://jsonplaceholder.typicode.com/users')
    .then((responce) => responce.json())
    .then((json) => {
        dispatch({
            type: 'load/users/fulfilled',
            payload: json
        })
    })
  }
}

export const counterSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {

  },
})

export default counterSlice.reducer