import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './slice/taskSlice'
import authReducer from './slice/authSlice'
import themeReducer from './slice/themeSlice'
export const store = configureStore({
    reducer:{
        auth : authReducer,
        tasks:taskReducer,
        theme: themeReducer
    }
})