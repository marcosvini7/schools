import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = {
  
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {

  }
})

export const actions = globalSlice.actions

export const store = configureStore({
  reducer: {
    global: globalSlice.reducer
  }
})