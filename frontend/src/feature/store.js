
//here create the store
import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
export const Store=configureStore({
    reducer:authSlice
})