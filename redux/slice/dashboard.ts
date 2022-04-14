import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardSlice } from '@utils/types';

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        navOpen:false,
        modalOpen: false
    } as DashboardSlice,
    reducers: {
        toggleNav: (state, action:PayloadAction<boolean | undefined>)=>{
            if(action.payload){
                state.navOpen = action.payload
            }else{
                state.navOpen = !state.navOpen
            }
        },
        toggleModal: (state, action:PayloadAction<boolean | undefined>)=>{
            if(action.payload){
                state.modalOpen = action.payload
            }else{
                state.modalOpen = !state.modalOpen
            }
        }
    }
})

export const {toggleNav, toggleModal} = dashboardSlice.actions
const dashboardReducer = dashboardSlice.reducer
export default dashboardReducer