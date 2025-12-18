import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { API } from '../../api/axios'

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async(data,thunkAPI)=>{
        try {
            const res = await API.post('/auth/login',data)
            return res.data.user
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Login failed"
      );
        }
    }
)

//? register user thunk 
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async(data,thunkAPI)=>{

        try {
            const res = await API.post('/auth/register',data)
            return res.data.newUser
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Register failed"
      );
        }

    }
)


//logout thunk api

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async(_,thunkAPI)=>{
        try {
             await API.post('/auth/logout')
            return null
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Logout failed"
      ); 
        }
    }
)



const initialState = {
    user: null,
  loading: false,
  error: null,
}


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        resetError: (state) => {
      state.error = null;
    }
    },

    extraReducers :(builder)=>{
       builder
       .addCase(loginUser.pending, (state)=>{
        state.loading = true
       })
       .addCase(loginUser.fulfilled, (state,action)=>{
        state.loading = false
        state.user = action.payload
       })
       .addCase(loginUser.rejected, (state,action)=>{
        state.loading = false
        state.error = action.payload
       })

       //register 
       .addCase(registerUser.pending,(state)=>{
        state.loading = true
        state.error = null
       })
       .addCase(registerUser.fulfilled,(state,action)=>{
        state.loading = false
        state.user = action.payload // getting data by payload (newUser)
       })
       .addCase(registerUser.rejected, (state,action)=>{
        state.loading = false
        state.error = action.payload
       })

       //logout
       .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
    }

})


export const { resetError } = authSlice.actions;
export default authSlice.reducer;