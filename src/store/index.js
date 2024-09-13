import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: {
    name: '',
    token: ''
  },
  schools: [],
  cities: [],
  dataLoading: true
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setSchools: (state, action) => {
      state.schools = action.payload
    },
    setCities: (state, action) => {
      state.cities = action.payload
    },
    setDataLoading: (state, action) => {
      state.dataLoading = action.payload
    }
  }
})

export const actions = globalSlice.actions

export const store = configureStore({
  reducer: {
    global: globalSlice.reducer
  }
})