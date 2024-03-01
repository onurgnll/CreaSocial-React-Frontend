import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  logged: false,
  user: null,
  isUserVerified: false
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state,action) => {
      state.logged = true,
      state.user = action.payload
    },
    verifyUser: (state) => {
      state.isUserVerified = true
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, verifyUser, incrementByAmount } = loginSlice.actions

export default loginSlice.reducer