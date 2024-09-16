import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: {
    name: '',
    token: ''
  },
  schools: [],
  cities: [],
  dataLoading: false,
  btnLoading: false,
  modal: {
    title: 'Confimação',
    body: '',
    data: '',
    action: ''
  },
  modalAction: '',
  someChange: false,
  pageData: {},
  linkDisabled: {}
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
    },
    setBtnLoading: (state, action) => {
      state.btnLoading = action.payload
    },
    setModal: (state, action) => {
      state.modal = action.payload
    },
    setModalAction: (state, action) => {
      state.modalAction = action.payload
    },
    setSomeChange: (state, action) => {
      state.someChange = action.payload
    },
    setPageData: (state, action) => {
      state.pageData = action.payload
    },
    setLinkDisabled: (state, action) => {
      state.linkDisabled = action.payload
    }
  }
})

export const actions = globalSlice.actions

export const store = configureStore({
  reducer: {
    global: globalSlice.reducer
  }
})