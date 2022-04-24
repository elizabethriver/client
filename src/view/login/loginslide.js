import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../api/api";

const initialState = {
  dataLogin: [],
};

// First, create the thunk
export const axiosLogin = createAsyncThunk("login/api", async (dataLogin) => {
  const { email, password } = dataLogin;
  try {
    const response = await login(email, password);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const loginSlide = createSlice({
  name: "dataLogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(axiosLogin.fulfilled, (state, action) => {
      // Add user to the state array
      state.dataLogin.push(action.payload);
    });
  },
});

// export const {} = loginslide.actions

export default loginSlide.reducer;
