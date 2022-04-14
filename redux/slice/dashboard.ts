import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DashboardSlice } from '@utils/types'

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    navOpen: false,
    modal: {
      open: false,
      type_: 'none',
    },
    payment: undefined,
    receipt: undefined,
  } as DashboardSlice,
  reducers: {
    toggleNav: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload) {
        state.navOpen = action.payload
      } else {
        state.navOpen = !state.navOpen
      }
    },
    toggleModal: (state, action: PayloadAction<DashboardSlice['modal']>) => {
      state.modal = action.payload
    },
    setModalType: (
      state,
      action: PayloadAction<DashboardSlice['modal']['type_']>
    ) => {
      state.modal.type_ = action.payload
    },
    setPayment: (state, action: PayloadAction<DashboardSlice['payment']>) => {
      state.payment = action.payload
    },
    setReceipt: (state, action: PayloadAction<DashboardSlice['receipt']>) => {
      state.receipt = action.payload
    },
  },
})

export const { toggleNav, toggleModal, setPayment, setReceipt, setModalType } =
  dashboardSlice.actions

const dashboardReducer = dashboardSlice.reducer
export default dashboardReducer
