import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: {
    name: '',
    token: ''
  }
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const actions = globalSlice.actions

export const store = configureStore({
  reducer: {
    global: globalSlice.reducer
  }
})