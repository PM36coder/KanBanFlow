import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './slice/taskSlice'
import authReducer from './slice/authSlice'

export const store = configureStore({
    reducer:{
        auth : authReducer,
        tasks:taskReducer,
        
    }
})