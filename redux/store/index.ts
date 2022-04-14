import authReducer from '@redux/slice/auth'
import dashboardReducer from '@redux/slice/dashboard'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
