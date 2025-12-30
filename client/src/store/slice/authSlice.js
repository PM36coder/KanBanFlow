import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../api/axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", data);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Login failed"
      );
    }
  }
);

//? register user thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/auth/register", data);
      return res.data.newUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Register failed"
      );
    }
  }
);

//! load user on refresh
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/auth/me"); // backend route
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || " Failed to load user"
      );
    }
  }
);

//logout thunk api

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await API.post("/auth/logout");
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Logout failed"
      );
    }
  }
);

//? update Password
export const updateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async ({password,newPassword}, thunkAPI) => {
    try {
      const res = await API.post("/auth/update-password", {password,newPassword});
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Logout failed"
      );
    }
  }
);

// Send OTP Thunk
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, thunkAPI) => {
    try {
      const res = await API.post("/auth/send-otp", { email });
      return res.data; // { message: "OTP sent" }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

//  Reset Password Thunk
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      // data = { email, otp, newPassword }
      const res = await API.post("/auth/reset-password", data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Reset failed"
      );
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetMessage: (state) => {
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // getting data by payload (newUser)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      //load user
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; 
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      //update-password
      .addCase(updateUserPassword.pending,(state)=>{
        state.loading = true;
        state.error = null;
        state.message = null
      })
      .addCase(updateUserPassword.fulfilled,(state,action)=>{
        state.loading = false;
        state.message = action.payload.message;
        state.error = null
      })
      .addCase(updateUserPassword.rejected,(state,action)=>{
        state.loading = false;
         state.error = action.payload;
         state.message = null;
      })
      // Send OTP Handlers
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Reset Password Handlers
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError,resetMessage } = authSlice.actions;
export default authSlice.reducer;
