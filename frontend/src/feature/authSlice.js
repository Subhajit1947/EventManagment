import {createSlice} from '@reduxjs/toolkit'

//initialize the store
const initialState={
    islogin:false
}
//here all the reducers are written
const authSlice=createSlice({
    name:'Auth',
    initialState,
    reducers:{
        loginfn:(state,action)=>{
            state.islogin=true
        },
        logoutr:(state,action)=>{
            state.islogin=false
        }

    }
})

export const {loginfn,logoutr}=authSlice.actions
export default authSlice.reducer
