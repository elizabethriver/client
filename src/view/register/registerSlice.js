import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register } from "../../api/api";

const initialState = {
  dataRegister: [],
};

// First, create the thunk
export const axiosRegister = createAsyncThunk(
  "register/api",
  async (dataRegister) => {
    const { name, email, password, confirmPassword } = dataRegister;
    let response = null;
    try {
      console.log({ name, email, password, confirmPassword });
      response = await register(name, email, password, confirmPassword);
      return response.data;
    } catch (error) {
      response = error.response;
      console.log(response);
      throw error;
    }
  }
);

const registerSlice = createSlice({
  name: "dataRegister",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(axiosRegister.fulfilled, (state, action) => {
      // Add user to the state array
      state.dataRegister.push(action.payload);
    });
  },
});

// export const {} = registerSlice.actions

export default registerSlice.reducer;
