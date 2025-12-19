import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../api/axios"; 

//get user all tasks

export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async(_,thunkAPI)=>{
        try {
            const res = await API.get("/tasks")
            return res.data.tasks
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch tasks"
      );
        }
    }
)

// createTask thunk

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async(data,thunkAPI)=>{
        try {
            const res = await API.post('/tasks',data)
            return res.data.task
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch tasks"
      );
        }
    }
)


//update Tasks 
export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async({ id, updates },thunkAPI)=>{
        try {
            const res = await API.put(`/tasks/${id}` , updates)
            return res.data
        } catch (error) {
             return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch tasks"
      );
        }
    }
)

//delete Task

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/tasks/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to delete task"
      );
    }
  }
);


// 5. Delete All Tasks
export const deleteAllTasks = createAsyncThunk(
  "tasks/deleteAllTasks",
  async (_, thunkAPI) => {
    try {
      await API.delete("/tasks/delete-all"); 
      return; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to delete all tasks"
      );
    }
  }
);

//create slice

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })

      // update
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })

      // delete
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (t) => t._id !== action.payload
        );
      })
      //delete All
      .addCase(deleteAllTasks.fulfilled, (state) => {
        state.tasks = []; 
      });

    
      
  },
});

export default taskSlice.reducer;