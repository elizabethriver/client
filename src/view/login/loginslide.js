import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../api/api";

const initialState = {
  data: [],
};

// First, create the thunk
export const axiosLogin = createAsyncThunk(
  "login/api",
  async ({ email, password }) => {
    try {
      const response = await login(email, password);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const loginslide = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(axiosLogin.fulfilled, (state, action) => {
      // Add user to the state array
      state.data.push(action.payload);
    });
  },
});

// export const {} = loginslide.actions

export default loginslide.reducer;
