import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../api/api";

const initialState = {
  dataLogin: [],
  loading: false,
};

// First, create the thunk
export const axiosLogin = createAsyncThunk("login/api", async (dataLogin) => {
  const { email, password } = dataLogin;
  let response = null;
  try {
    response = await login(email, password);
    const { data } = response;
    return data;
  } catch (error) {
    response = error.response;
    console.log(response);
    throw error;
  }
});

export const loginSlide = createSlice({
  name: "dataLogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(axiosLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(axiosLogin.fulfilled, (state, action) => {
      state.dataLogin.push(action.payload);
    });
    builder.addCase(axiosLogin.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default loginSlide.reducer;
