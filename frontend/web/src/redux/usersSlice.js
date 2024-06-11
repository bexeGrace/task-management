import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Asynchronous thunk to fetch users data
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("http://localhost:4000/api/users");
  const data = await response.json();
  return data.users; // Adjust this based on your API response structure
});

// Asynchronous thunk to handle user login
export const loginUser = createAsyncThunk("users/loginUser", async (credentials) => {
  const response = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('authToken', data.token)
    return data.user;
  } else {
    console.log(data)
    throw new Error(data.message);
  }
});

// Asynchronous thunk to handle user registration
export const registerUser = createAsyncThunk("users/registerUser", async (userInfo) => {
  const response = await fetch("http://localhost:4000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const data = await response.json();
  if (response.ok) {
    return data.user;
  } else {
    throw new Error(data.message);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentUser: null,
    status: "idle",
    error: null,
  },
  reducers: {
    // Your existing reducers here (if any)
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logoutUser } = usersSlice.actions;

export default usersSlice;
