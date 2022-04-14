import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthSlice, LoggedInUser } from '../../utils/types'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: undefined,
    token: '',
    loggedIn: false,
    loading: true,
  } as AuthSlice,
  reducers: {
    addUser: (state, action: PayloadAction<LoggedInUser| undefined>) => {
      state.user = action.payload
    },
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { addUser, addToken, setLoginState, setLoading } =
  authSlice.actions
  
const authReducer = authSlice.reducer
export default authReducer
